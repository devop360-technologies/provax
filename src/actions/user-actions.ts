"use server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma-mock";
import { User } from "@/types/user";

export async function getUsers(): Promise<User[]> {
  try {
    const currentUser = await getCurrentUser();

    // Only allow admin users to view user table
    // if (!currentUser?.isAdmin) {
    //   throw new Error("Unauthorized");
    // }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        hasAccess: true,
        createdAt: true,
        subscribedAt: true,
        emailVerified: true,
        isAdmin: true,
        image: true,
        customerId: true,
        priceId: true
      }
    });

    return users;

  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Error fetching users:", error);
    }
    throw new Error("Failed to fetch users");
  }
}

export async function deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const currentUser = await getCurrentUser();

    // Only allow admin users to delete users
    // if (!currentUser?.isAdmin) {
    //   return { success: false, error: "Unauthorized" };
    // }

    // Prevent admin from deleting themselves
    if (currentUser!.id === userId) {
      return {
        success: false,
        error: "Cannot delete your own account"
      };
    }

    await prisma.user.delete({ where: { id: userId } });

    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Error deleting user:", error);
    }
    return { success: false, error: "Failed to delete user" };
  }
}
