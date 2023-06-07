import { createEvent, getUser } from "@/lib/events";
import redis from "@/lib/redis";
import { EventType } from "@/types/events";
import { NextRequest } from "next/server";

export const revalidate = 0;

export async function POST(request: NextRequest) {
  const json = await request.json()
  const { type, data } = json as { type: EventType, data: string };
  const user = await getUser(request);
  // TODO: use same timestamp for event and state store
  createEvent(type, { data }, user);
  await redis.zadd("comments", { score: new Date().getTime(), member: data });

  return new Response("Created", {
    status: 201
  })
}
// TODO: type should be automatically set!
export async function PUT(request: NextRequest) {
  const json = await request.json()
  const { type, data } = json as { type: EventType, data: string }
  const user = await getUser(request);
  createEvent(type, {data}, user);
}

// export async function DELETE(request: Request) {}