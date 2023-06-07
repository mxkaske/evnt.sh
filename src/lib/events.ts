import { EventData, EventType, EventUserType } from "@/types/events";
import redis from "@/lib/redis";
import { USERS } from "@/constants/users";
import { NextRequest } from "next/server";

// TODO: rethink of logic
export function createEventObject<T>(type: EventType, data: T, user: EventUserType) {
  const timestamp = new Date().getTime();
  const event = { type, [type]: data, timestamp, user };
  return { score: timestamp, member: JSON.stringify(event) }
}

// add name of redis key - default is "events" - goal is "events:comments:id"
export async function createEvent<T>(type: EventType, data: T, user: EventUserType) {
  const eventObj = createEventObject(type, data, user)
  const res = await redis.zadd("events", eventObj);
  return res;
}

export async function listEvents() {
  const res = await redis.zrange("events", 0, -1);
  return res as EventData[];
}

// FIXME: this does not belong here...
// REMINDER: this is how we access the user, via ?user=1
export async function getUser(request: NextRequest) {
  const cookiesList = request.cookies;
  const hasId = cookiesList.has("id");
  const userId = hasId && cookiesList.get("id")?.value;
  const user = userId && USERS.find(({ id }) => userId === id.toString()) || USERS[1];
  const { id, username, avatar } = user;
  return { id, username, avatar };
}