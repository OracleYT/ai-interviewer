"use server";

import prisma from "@/libs/db/prisma";

type UpdateProp = {
  userId: string;
  status: "COMPLETED" | "PENDING" | "ONGOING" | "CANCELLED";
};

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

export async function getInterviewer(userId: string) {

  // find the interviewerId for the user
  const interviewerId = await prisma.interview.findFirst({
    where: {
      userId,
    },
    select: {
      interviewerId: true,
    },
  });

  if (!interviewerId || !interviewerId.interviewerId) {
    return {
      status: 404,
      success: false,
      message: "Interviewer not found",
      data: null,
    };
  }

  // find the interviewer details using the interviewerId
  const interviewer = await prisma.interviewer.findFirst({
    where: {
      id: interviewerId.interviewerId,
    },
  });

  if (!interviewer) {
    return {
      status: 404,
      success: false,
      message: "Interviewer not found",
      data: null,
    };
  }

  return {
    status: 200,
    success: true,
    message: "Interviewer found",
    data: interviewer,
  };
}
