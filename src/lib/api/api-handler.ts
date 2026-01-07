import { NextRequest, NextResponse } from "next/server";

interface ActionResult {
  success: boolean;
  error?: string;
  message?: string;
}

interface ApiHandlerOptions {
  /** Fields required in the request body */
  requiredFields: string[];
  /** Error message when fields are missing */
  missingFieldsError: string;
  /** Error message when action fails (fallback) */
  failureError: string;
  /** Log prefix for development errors */
  logPrefix: string;
  /** Custom validation function */
  validate?: (body: Record<string, unknown>) => { valid: boolean; error?: string };
}

/**
 * Creates a standardized API POST handler that reduces code duplication
 */
export function createApiHandler<T extends Record<string, unknown>>(
  action: (data: T) => Promise<ActionResult>,
  options: ApiHandlerOptions
) {
  return async function POST(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json();

      // Check required fields
      const missingFields = options.requiredFields.filter(
        (field) => body[field] === undefined || body[field] === null || body[field] === ""
      );

      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: options.missingFieldsError },
          { status: 400 }
        );
      }

      // Run custom validation if provided
      if (options.validate) {
        const validation = options.validate(body);
        if (!validation.valid) {
          return NextResponse.json(
            { error: validation.error },
            { status: 400 }
          );
        }
      }

      const result = await action(body as T);

      if (!result.success) {
        return NextResponse.json(
          { error: result.error ?? options.failureError },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: true, message: result.message },
        { status: 200 }
      );
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error(`${options.logPrefix}:`, error);
      }
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}
