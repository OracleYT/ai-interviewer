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
  console.log(interview);

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
    data: interview,
  };
}
