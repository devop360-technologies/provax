"use server";

import { getCurrentUser } from "@/lib/auth";
import { removeFromStorage, uploadToStorage } from "@/lib/s3";

/** ========================================================================
 * Upload a new file with authentication
 * =========================================================================
 */
export async function uploadFileToStorage(file: File) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {
        status: "error",
        message: "Unauthorized Access!"
      };
    }

    if (!file) {
      return {
        status: "error",
        message: "File is required!"
      };
    }

    const url = await uploadToStorage(file);
    return {
      status: "success",
      url
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload file";
    return { status: "error", message };
  }
}

/** ========================================================================
 * Remove a file with authentication
 * =========================================================================
 */
export async function removeFileFromStorage(url: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {
        status: "error",
        message: "Unauthorized Access!"
      };
    }

    if (!url) {
      return {
        status: "error",
        message: "URL is required!"
      };
    }

    const result = await removeFromStorage(url);
    return {
      status: "success",
      deleted: result
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to remove file";
    return { status: "error", message };
  }
}
