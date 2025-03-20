"use server";

import prisma from "@/libs/db/prisma";

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
