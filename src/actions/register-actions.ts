"use server";

import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/zod-schemas";

export async function authRegisterAction(data: RegisterSchema) {
  try {
    const validationResult = registerSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        status: "error",
        errors: validationResult.error.flatten()
      };
    }

    const { email, password, name } = validationResult.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    return { status: "success", message: "User registered successfully" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to register user";
    return { status: "error", message };
  }
}
