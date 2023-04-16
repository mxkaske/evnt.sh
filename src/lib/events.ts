import { EventData, EventType } from "@/types/events";
import redis from "@/lib/redis";

export async function createEvent<T>(type: EventType, data: T) {
  const timestamp = new Date().getTime();
  const event = { type, data, timestamp };
  const res = await redis.zadd("events", {
    score: timestamp,
    member: JSON.stringify(event),
  });
  return res;
}

export async function listEvents() {
  const res = await redis.zrange("events", 0, -1);
  return res as EventData[];
}

// DISCUSS: different file?
export async function getCurrentState() {}
