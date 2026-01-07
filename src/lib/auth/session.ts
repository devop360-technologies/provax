import "server-only";

import { cache } from "react";

import { auth } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/** ==============================================================================================
 * Get the current user from the database
 * @returns {Promise<User | null>} The current user or null if not found
 *  ==============================================================================================
 */

export const getCurrentUser = cache(async () => {
  try {
    const session = await auth();

    if (session?.user) {
      // Fetch full user data from Express backend
      const response = await fetch(`${API_BASE_URL}/api/auth/user/${session.user.id}`, {
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          return data.data;
        }
      }

      // Fallback to session user if API fails
      return {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      };
    }

    return null;
  } catch {
    return null;
  }
});
