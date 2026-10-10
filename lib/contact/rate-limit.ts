import "server-only"

/**
 * Minimal fixed-window rate limiter kept in process memory.
 *
 * Good enough for a single long-running server. On serverless or multi-instance
 * deployments each instance keeps its own counters — swap this for a shared
 * store (e.g. Upstash Redis) by implementing the same `RateLimiter` interface.
 */

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number }

export interface RateLimiter {
  check(key: string): RateLimitResult
}

type Window = { count: number; resetAt: number }

export function createMemoryRateLimiter({
  limit,
  windowMs,
  maxKeys = 10_000,
}: {
  limit: number
  windowMs: number
  maxKeys?: number
}): RateLimiter {
  const windows = new Map<string, Window>()

  function prune(now: number) {
    for (const [key, window] of windows) {
      if (window.resetAt <= now) windows.delete(key)
    }
  }

  return {
    check(key) {
      const now = Date.now()
      if (windows.size >= maxKeys) prune(now)

      const current = windows.get(key)
      if (!current || current.resetAt <= now) {
        windows.set(key, { count: 1, resetAt: now + windowMs })
        return { allowed: true, retryAfterSeconds: 0 }
      }

      current.count += 1
      const retryAfterSeconds = Math.ceil((current.resetAt - now) / 1000)
      return { allowed: current.count <= limit, retryAfterSeconds }
    },
  }
}
