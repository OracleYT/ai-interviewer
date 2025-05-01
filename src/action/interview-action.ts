"use server";

import { prisma } from "@/libs/db/prisma";
import axios from "axios";

type UpdateProp = {
  userId: string;
  status: "COMPLETED" | "PENDING" | "ONGOING" | "CANCELLED";
};

const interviewCompletionApi = process.env.NEXT_INTERVIEW_COMPLETION_API || "";

export async function getInterviews(userId: string) {
  const interviews = await prisma.interview.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!interviews) {
    return {
      status: 404,
      success: false,
      message: "No interviews found",
      data: null,
    };
  }

  return {
    status: 200,
    success: true,
    message: "Interviews found",
    data: interviews,
  };
}

export async function updateInterviewStatus({ userId, status }: UpdateProp) {
  if (!userId) {
    return {
      status: 400,
      success: false,
      message: "User ID is required",
      data: null,
    };
  }

  const interview = await prisma.interview.updateMany({
    where: {
      userId,
    },
    data: {
      status,
    },
  });

  if (!interview) {
    return {
      status: 404,
      success: false,
      message: "Interview not found",
      data: null,
    };
  }

  return {
    status: 200,
    success: true,
    message: "Interview status updated",
    data: interview,
  };
}

export async function getInterviewDetails(interviewId: string) {
  // find the interviewerId for the user

  const interview = await prisma.interview.findFirst({
    where: {
      id: interviewId,
    },
    select: {
      interviewerId: true,
      interviewer: true,
      user: true,
      title: true,
      status: true,
      expiryDate: true,
      createdAt: true,
    },
  });

  if (!interview) {
    return {
      status: 404,
      success: false,
      message: "Interview not found",
      data: null,
    };
  }
  if (interview.user && interview.user.passwordHash)
    interview.user.passwordHash = "";

  return {
    status: 200,
    success: true,
    data: interview,
  };
}

export async function updateInterviewStatusById(data: {
  interviewId: string;
  status: "COMPLETED" | "ONGOING";
  callId: string;
}) {
  const update: any = {
    status: data.status,
    callId: data.callId,
  };
  if (data.status === "ONGOING") {
    update.startedAt = new Date();
  } else if (data.status === "COMPLETED") {
    update.endedAt = new Date();
  }

  const updatedInterview = await prisma.interview.update({
    where: {
      id: data.interviewId,
    },
    data: update,
  });

  if (!updatedInterview) {
    return {
      status: 404,
      success: false,
      message: "Interview not found",
      data: null,
    };
  }

  return {
    status: 200,
    success: true,
    message: "Interview status updated",
    data: updatedInterview,
  };
}

export async function addProcterEvidance(data: {
  interviewId: string;
  evidence: any;
}) {
  console.log(
    "Updating procter report with data:\n\n " + JSON.stringify(data, null, 2)
  );

  try {
    if (!data.interviewId) {
      return {
        status: 400,
        success: false,
        message: "Interview ID is required",
        data: null,
      };
    }
    if (!data.evidence) {
      return {
        status: 400,
        success: false,
        message: "Evidence is required",
        data: null,
      };
    }

    const interviewData = await prisma.interview.findFirst({
      where: {
        id: data.interviewId,
      },
      select: {
        procterReport: true,
      },
    });

    if (!interviewData) {
      return {
        status: 404,
        success: false,
        message: "Interview not found",
        data: null,
      };
    }

    //@ts-ignore
    const procterReport: any = interviewData?.procterReport?.evidences
      ? interviewData?.procterReport
      : {
          evidences: [],
        };

    if (!procterReport?.evidences) {
      procterReport.evidences = [];
    }
    procterReport.evidences.push(data.evidence);
    await prisma.interview.update({
      where: {
        id: data.interviewId,
      },
      data: {
        procterReport,
      },
    });
    console.log("Procter report updated for interview", data.interviewId);
    return {
      status: 200,
      success: true,
      message: "Procter report updated",
    };
  } catch (error) {
    console.error("Error while updating procter report", error);
  }
}

export async function sendInterviewDoneEvent(meetingId: string) {
  try {
    const response = await axios.post(interviewCompletionApi, { meetingId });
    response.status === 200;
  } catch (error) {
    console.error(error);
  }
  return false;
}

export async function addImageEvidance(data: {
  interviewId: string;
  evidence: any;
}) {
  console.log(`[IMAGE_EVIDENCE] Starting to process image evidence for interview: ${data.interviewId}`);
  
  try {
    console.log(`[IMAGE_EVIDENCE] Request payload: ${JSON.stringify({
      interviewId: data.interviewId,
      evidenceType: data.evidence?.title || 'unknown',
      violation: data.evidence?.violation || 'unknown',
      hasEvidenceURL: !!data.evidence?.evidenceURL
    }, null, 2)}`);

    // Input validation
    if (!data.interviewId) {
      console.warn(`[IMAGE_EVIDENCE] Missing required field: interviewId`);
      return {
        status: 400,
        success: false,
        message: "Interview ID is required",
        data: null,
      };
    }
    
    if (!data.evidence) {
      console.warn(`[IMAGE_EVIDENCE] Missing required field: evidence for interview ${data.interviewId}`);
      return {
        status: 400,
        success: false,
        message: "Evidence is required",
        data: null,
      };
    }

    console.log(`[IMAGE_EVIDENCE] Validation passed. Updating database for interview ${data.interviewId} with violation type: ${data.evidence.title || 'unknown'}`);

    // Database operation
    console.log(`[IMAGE_EVIDENCE] Executing database update for interview ${data.interviewId}`);
    const interviewData = await prisma.interview.update({
      where: {
        id: data.interviewId,
      },
      data: {
        evidence: {
          push: {
            title: data.evidence.title,
            evidence: {
              evidenceURL: data.evidence.evidenceURL,
            },
            violation: data.evidence.violation,
            capturedAt: new Date(),
          },
        },
      },
    });

    console.log(`[IMAGE_EVIDENCE] Successfully updated evidence for interview ${data.interviewId}`);
    console.log(`[IMAGE_EVIDENCE] Evidence details: title=${data.evidence.title}, violation=${data.evidence.violation}, timestamp=${new Date().toISOString()}`);
    
    return {
      status: 200,
      success: true,
      message: "Procter report updated",
    };
  } catch (error) {
    // Enhanced error logging
    console.error(`[IMAGE_EVIDENCE] ERROR updating evidence for interview ${data.interviewId || 'unknown'}`);
    console.error(`[IMAGE_EVIDENCE] Error details:`, error);
    
    if (error instanceof Error) {
      console.error(`[IMAGE_EVIDENCE] Error message: ${error.message}`);
      console.error(`[IMAGE_EVIDENCE] Error stack: ${error.stack}`);
    }
    
    return {
      status: 500,
      success: false,
      message: "Failed to update evidence",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
