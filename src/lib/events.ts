import { EventData, EventType } from "@/types/events";
import redis from "@/lib/redis";
import { EVENT_USER } from "@/constants/event";

const user = EVENT_USER; // TODO: add dynamically

export function createEventObject<T>(type: EventType, data: T) {
  const timestamp = new Date().getTime();
  const event = { type, [type]: data, timestamp, user };
  return { score: timestamp, member: JSON.stringify(event) }
}

// add name of redis key - default is "events"
export async function createEvent<T>(type: EventType, data: T) {
  const eventObj = createEventObject(type, data)
  const res = await redis.zadd("events", eventObj);
  return res;
}

export async function listEvents() {
  const res = await redis.zrange("events", 0, -1);
  return res as EventData[];
}
