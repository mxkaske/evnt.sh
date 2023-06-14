import { redis } from ".";

const TTL = 60 * 60 * 24 * 7; // 7 days cache

// should be body generic - or better call data
export async function createState(key: string, data: Record<string, unknown>) {
  const res = await redis.json.set(key, "$", JSON.stringify(data));
  await redis.expire(key, TTL);
  return res;
}

// use redis pipelines for multiple operations. maybe comes handy with comments?
export async function updateState(key: string, name: string, value: unknown) {
  const res = await redis.json.set(key, `$.${name}`, JSON.stringify(value));
  await redis.expire(key, TTL);
  return res;
}

export async function readState<T>(key: string) {
  const res = await redis.json.get(key);
  return res as T;
}

export async function deleteState(key: string) {
  const res = await redis.del(key);
  return res;
}
