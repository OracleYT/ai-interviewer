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
