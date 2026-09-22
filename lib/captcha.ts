import crypto from "crypto";

const SECRET =
  process.env.CAPTCHA_SECRET ||
  process.env.RESEND_API_KEY ||
  "fallback-portfolio-captcha-salt-v1";

// Cache for used nonces to prevent replay attacks (nonce -> expiry timestamp)
const usedNonces = new Map<string, number>();

// Clean up expired nonces every 10 minutes
const NONCE_CLEANUP_INTERVAL = 10 * 60 * 1000;
let lastNonceCleanup = Date.now();

function cleanupUsedNonces() {
  const now = Date.now();
  if (now - lastNonceCleanup < NONCE_CLEANUP_INTERVAL) return;
  lastNonceCleanup = now;

  usedNonces.forEach((expiresAt: number, nonce: string) => {
    if (now > expiresAt) {
      usedNonces.delete(nonce);
    }
  });
}

export interface CaptchaChallenge {
  token: string;
  question: string;
}

/**
 * Generates a human-friendly math challenge and a cryptographically signed token.
 */
export function generateCaptchaChallenge(): CaptchaChallenge {
  cleanupUsedNonces();

  const operations = ["+", "-", "x"] as const;
  const op = operations[Math.floor(Math.random() * operations.length)];

  let num1: number;
  let num2: number;
  let answer: number;

  if (op === "+") {
    num1 = Math.floor(Math.random() * 12) + 3; // 3 to 14
    num2 = Math.floor(Math.random() * 9) + 2;  // 2 to 10
    answer = num1 + num2;
  } else if (op === "-") {
    num1 = Math.floor(Math.random() * 12) + 10; // 10 to 21
    num2 = Math.floor(Math.random() * 8) + 1;   // 1 to 8
    answer = num1 - num2;
  } else {
    // Multiplication with small, easy numbers
    num1 = Math.floor(Math.random() * 6) + 2; // 2 to 7
    num2 = Math.floor(Math.random() * 5) + 2; // 2 to 6
    answer = num1 * num2;
  }

  const question = `${num1} ${op === "x" ? "×" : op} ${num2}`;
  const timestamp = Date.now();
  const nonce = crypto.randomBytes(8).toString("hex");

  // Create HMAC signature encompassing answer, nonce, and timestamp
  const payload = `${nonce}:${timestamp}:${answer}`;
  const hmac = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");

  // Token format: base64(nonce:timestamp:hmac)
  const token = Buffer.from(`${nonce}:${timestamp}:${hmac}`).toString("base64url");

  return {
    token,
    question,
  };
}

export interface VerificationResult {
  valid: boolean;
  error?: string;
}

/**
 * Verifies a submitted CAPTCHA response against the signed token.
 */
export function verifyCaptchaChallenge(
  token: string | undefined | null,
  userAnswer: string | number | undefined | null
): VerificationResult {
  if (!token || userAnswer === undefined || userAnswer === null || userAnswer === "") {
    return { valid: false, error: "Please complete the security verification challenge." };
  }

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length !== 3) {
      return { valid: false, error: "Invalid security verification token." };
    }

    const [nonce, timestampStr, hmac] = parts;
    const timestamp = parseInt(timestampStr, 10);
    const now = Date.now();

    // Check expiration (valid for 10 minutes)
    const MAX_AGE_MS = 10 * 60 * 1000;
    if (isNaN(timestamp) || now - timestamp > MAX_AGE_MS) {
      return { valid: false, error: "Security challenge expired. Please solve the new challenge." };
    }

    // Minimum time threshold: reject if submitted within < 1.5 seconds (bot protection)
    if (now - timestamp < 1500) {
      return { valid: false, error: "Submission too fast. Please take a moment and try again." };
    }

    // Replay attack check
    if (usedNonces.has(nonce)) {
      return { valid: false, error: "This security challenge was already used. Please refresh." };
    }

    const cleanUserAnswer = String(userAnswer).trim();
    const expectedPayload = `${nonce}:${timestamp}:${cleanUserAnswer}`;
    const expectedHmac = crypto.createHmac("sha256", SECRET).update(expectedPayload).digest("hex");

    // Timing-safe equal comparison
    const hmacBuf = Buffer.from(hmac, "hex");
    const expectedBuf = Buffer.from(expectedHmac, "hex");

    if (hmacBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(hmacBuf, expectedBuf)) {
      return { valid: false, error: "Incorrect security challenge answer. Please try again." };
    }

    // Mark nonce as used with expiration
    usedNonces.set(nonce, now + MAX_AGE_MS);

    return { valid: true };
  } catch (err) {
    return { valid: false, error: "Failed to verify security challenge." };
  }
}
