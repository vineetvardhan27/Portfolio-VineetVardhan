import { NextResponse } from "next/server";
import { generateCaptchaChallenge } from "@/lib/captcha";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // Light rate limiting on captcha generation to prevent spamming challenge generation
  const clientIp = getClientIp(req);
  const rateLimitResult = checkRateLimit(`captcha_${clientIp}`, {
    windowMs: 60 * 1000,
    maxRequests: 30, // 30 requests per minute
  });

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  const challenge = generateCaptchaChallenge();

  return NextResponse.json(challenge, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
