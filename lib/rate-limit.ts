/**
 * In-memory sliding window rate limiter for Next.js App Router API routes.
 * Tracks requests per client IP within a configurable time window.
 */

interface RateLimitRecord {
  timestamps: number[];
}

interface RateLimitConfig {
  windowMs: number; // Duration of window in milliseconds (e.g., 15 * 60 * 1000 for 15 minutes)
  maxRequests: number; // Maximum requests allowed in the window (e.g., 5)
}

// Global in-memory storage for rate limiting across requests in the current node process
const rateLimitMap = new Map<string, RateLimitRecord>();

// Run periodic cleanup every 10 minutes to avoid memory leaks
const CLEANUP_INTERVAL = 10 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleEntries(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  rateLimitMap.forEach((record: RateLimitRecord, key: string) => {
    const validTimestamps = record.timestamps.filter((ts: number) => now - ts < windowMs);
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(key);
    } else {
      record.timestamps = validTimestamps;
    }
  });
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

export function checkRateLimit(
  ip: string,
  config: RateLimitConfig = { windowMs: 15 * 60 * 1000, maxRequests: 5 }
): RateLimitResult {
  const now = Date.now();
  cleanupStaleEntries(config.windowMs);

  const record = rateLimitMap.get(ip) || { timestamps: [] };
  // Keep only timestamps within current window
  const validTimestamps = record.timestamps.filter((ts: number) => now - ts < config.windowMs);

  if (validTimestamps.length >= config.maxRequests) {
    const oldestTimestamp = validTimestamps[0];
    const resetTimeMs = oldestTimestamp + config.windowMs - now;
    const resetSeconds = Math.ceil(Math.max(1, resetTimeMs / 1000));

    return {
      allowed: false,
      limit: config.maxRequests,
      remaining: 0,
      resetSeconds,
    };
  }

  // Record this request
  validTimestamps.push(now);
  rateLimitMap.set(ip, { timestamps: validTimestamps });

  return {
    allowed: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - validTimestamps.length,
    resetSeconds: Math.ceil(config.windowMs / 1000),
  };
}

/**
 * Extracts client IP from Next.js request headers
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  
  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const clientIp = xForwardedFor.split(",")[0]?.trim();
    if (clientIp) return clientIp;
  }

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  return "127.0.0.1";
}
