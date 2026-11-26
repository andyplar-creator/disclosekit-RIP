// Limit zapytan oparty o atomowy UPSERT w D1.
// Nie uzywamy KV: jest ostatecznie spojne, wiec seria rownoleglych zapytan potrafi obejsc limit.

export interface RateResult {
  allowed: boolean;
  count: number;
  limit: number;
}

/**
 * Zlicza jedno uzycie klucza w biezacym oknie czasowym.
 * @param windowSeconds dlugosc okna (np. 86400 = doba)
 */
export async function hitRateLimit(db: D1Database, key: string, windowSeconds: number, limit: number, now: number): Promise<RateResult> {
  const windowStart = now - (now % windowSeconds);
  const row = await db
    .prepare(
      `INSERT INTO rate_limits (key, window_start, count) VALUES (?, ?, 1)
       ON CONFLICT (key, window_start) DO UPDATE SET count = count + 1
       RETURNING count`,
    )
    .bind(key, windowStart)
    .first<{ count: number }>();
  const count = row?.count ?? 1;
  if (count === 1) {
    // Pierwsze uzycie w nowym oknie: przy okazji sprzatamy stare okna (starsze niz 3 doby).
    await db
      .prepare(`DELETE FROM rate_limits WHERE window_start < ?`)
      .bind(now - 3 * 86400)
      .run();
  }
  return { allowed: count <= limit, count, limit };
}
