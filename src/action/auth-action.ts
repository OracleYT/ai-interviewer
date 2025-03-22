"use server";

import prisma from "@/libs/db/prisma";
import axios from "axios";

const resetPasswordUrl = process.env.NEXT_RESET_PASSWORD_API || "";

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
