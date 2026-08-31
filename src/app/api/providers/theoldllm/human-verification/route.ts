import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  getTheOldLlmHumanVerificationStatus,
  startTheOldLlmHumanVerification,
  stopTheOldLlmHumanVerification,
} from "@omniroute/open-sse/services/theOldLlmHumanVerification.ts";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;

  return NextResponse.json({
    verification: getTheOldLlmHumanVerificationStatus(),
  });
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;

  try {
    const verification = await startTheOldLlmHumanVerification();
    return NextResponse.json({ verification }, { status: 202 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: {
          type: "human_verification_browser_error",
          code: "THEOLDLLM_HUMAN_VERIFICATION_BROWSER_ERROR",
          message,
        },
      },
      { status: 503 }
    );
  }
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;

  await stopTheOldLlmHumanVerification("user-request");
  return NextResponse.json({
    verification: getTheOldLlmHumanVerificationStatus(),
  });
}
