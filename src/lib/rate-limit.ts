const attemptMap = new Map<string, { count: number; resetTime: number }>();

export function isRateLimited(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean {
  const now = Date.now();
  const attempt = attemptMap.get(identifier);

  if (!attempt) {
    attemptMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (now > attempt.resetTime) {
    attemptMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return false;
  }

  attempt.count++;
  return attempt.count > maxAttempts;
}

export function getRemainingTime(
  identifier: string,
  windowMs: number = 15 * 60 * 1000
): number {
  const attempt = attemptMap.get(identifier);
  if (!attempt) return 0;
  return Math.max(0, attempt.resetTime - Date.now());
}

export function resetAttempts(identifier: string): void {
  attemptMap.delete(identifier);
}

export function cleanupExpiredAttempts(): void {
  const now = Date.now();
  const keysToDelete: string[] = [];
  
  attemptMap.forEach((value, key) => {
    if (now > value.resetTime) {
      keysToDelete.push(key);
    }
  });
  
  keysToDelete.forEach(key => attemptMap.delete(key));
}
