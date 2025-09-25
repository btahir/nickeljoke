import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export const jokeRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '15 m'),
})

export interface JokeData {
  joke: string;
  topic?: string;
  timestamp: number;
}

export async function storeJoke(id: string, data: JokeData): Promise<void> {
  // Store for 7 days (604800 seconds)
  await redis.setex(`joke:${id}`, 604800, JSON.stringify(data));
}

export async function getJoke(id: string): Promise<JokeData | null> {
  const data: JokeData | null = await redis.get(`joke:${id}`);
  return data;
}
