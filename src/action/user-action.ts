"use server";

import { prisma } from "@/libs/db/prisma";
import axios from "axios";

const resetPasswordUrl = process.env.NEXT_RESET_PASSWORD_API || "";
const onboardingComplete = process.env.NEXT_ONBOARDING_COMPLETE_API || "";
const documentVerificationUrl =
  process.env.NEXT_DOCUMENT_VERIFICATION_API || "";

export async function verifyCredentials(email: string, password: string) {
  try {
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required",
        data: null,
      };
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user?.email !== email) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
    if (user?.passwordHash !== password) {
      return {
        success: false,
        message: "Invalid password",
        data: null,
      };
    }
    if (user.passwordHash) user.passwordHash = "";

    return {
      success: true,
      message: "User found",
      data: user,
    };
  } catch (error) {
    console.error("Error verifying user credentials:", error);
    return {
      success: false,
      message: "Error verifying user credentials",
      data: null,
    };
  }
}

export async function resetPassword(
  email: string
): Promise<{ success: boolean; message: string; data: any }> {
  try {
    if (resetPasswordUrl === "") {
      return {
        success: false,
        message: "Reset password API not found",
        data: null,
      };
    }
    if (!email) {
      return {
        success: false,
        message: "Email is required",
        data: null,
      };
    }
    const response = await axios.post(resetPasswordUrl, { email });
    if (response.status === 200) {
      return {
        success: true,
        message: "New password sent to your email",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error resetting password:", error);
  }
  return {
    success: false,
    message: "Error resetting password",
    data: null,
  };
}

export async function fetchUserById(
  userId: string
): Promise<{ success: boolean; message: string; data: any }> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
    return {
      success: true,
      message: "User found",
      data: user,
    };
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return {
      success: false,
      message: "Error fetching user by id",
      data: null,
    };
  }
}

export async function updateUserDocs(
  userId: string,
  docs: {
    url: string;
    status?: string;
    name: string;
  }
): Promise<{ success: boolean; message: string; data: any }> {
  try {
    if (!docs.status) docs.status = "uploaded";
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        docs: true,
      },
    });
    if (!user) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
    //@ts-ignore
    const newDocs: any[] = Array(...(user?.docs || []));

    if (newDocs.some((doc) => doc.name === docs.name)) {
      newDocs.forEach((doc) => {
        if (doc.name === docs.name) {
          doc.url = docs.url;
          doc.status = docs.status;
        }
      });
    } else {
      newDocs.push(docs);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        docs: newDocs,
      },
    });
    return {
      success: true,
      message: "User docs updated",
      data: updatedUser.docs,
    };
  } catch (error) {
    console.error("Error updating user docs:", error);
    return {
      success: false,
      message: "Error updating user docs",
      data: null,
    };
  }
}

export async function updateUserDetails(
  userId: string,
  data: {
    name: string;
    course: string;
    university: string;
  }
): Promise<{ success: boolean; message: string; data: any }> {
  try {
    console.log("updateUserDetails");

    console.log("userId", userId);
    console.log("data", data);
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });

    return {
      success: true,
      message: "User details updated",
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user details:", error);
    return {
      success: false,
      message: "Error updating user details",
      data: null,
    };
  }
}

export async function completeOnboarding(
  userId: string
): Promise<{ success: boolean }> {
  try {
    const res = await axios.post(onboardingComplete, { userId });
    console.log("onboardingComplete registered");
    return {
      success: res.status === 200,
    };
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return {
      success: false,
    };
  }
}

export async function verifyDocument(data: {
  docName: string;
  userId: string;
  docUrl: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await axios.post(documentVerificationUrl, data);
    console.log("documentVerification registered");
    return {
      success: res.status === 200,
      message: "Document verification registered",
    };
  } catch (error) {
    console.error("Error verifying document:", error);
    return {
      success: false,
      message: "Error verifying document",
    };
  }
}
