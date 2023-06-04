import { createEvent } from "@/lib/events";
import redis from "@/lib/redis";
import { EventType } from "@/types/events";

export const revalidate = 0;

export async function POST(request: Request) {
  const json = await request.json()
  const { type, data } = json as { type: EventType, data: string };
  // TODO: use same timestamp for event and state store
  createEvent(type, { data });
  await redis.zadd("comments", { score: new Date().getTime(), member: data });

  return new Response("Created", {
    status: 201
  })
}