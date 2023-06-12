import { createEvent, getUser, removeSuffixEventType } from "@/lib/events";
import redis from "@/lib/redis";
import { EventType } from "@/types/events";
import { State } from "@/types/states";
import { NextRequest } from "next/server";

export const revalidate = 0;

const TTL = 60 * 60 * 24 * 7 // 7 days cache

// move into redis utils
function createStateKey(id?: string | string[]) {
  return id ? ["states", ...(Array.isArray(id) ? id : [id])].join(":") : "states"
}

export async function GET(request: Request, {
  params,
}: { params: { id?: string | string[] } }) {
  // read state
  const key = createStateKey(params.id);
  const state = await redis.json.get(key) as State | undefined;
  if (!state) {
    return new Response("Not Found", { status: 404 })
  }
  return new Response(JSON.stringify(state), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest, {
  params,
}: { params: { id?: string | string[] } }) {
  const json = await request.json() as { type: EventType, data: string | number | string[] };
  const { type, data } = json;
  // store event
  const user = await getUser(request);
  createEvent(type, { data }, user);
  // create state
  const key = createStateKey(params.id);
  const attribute = removeSuffixEventType(type);
  await redis.json.set(key, "$", JSON.stringify({ [attribute]: data }));
  await redis.expire(key, TTL);

  return new Response("Created", { status: 201 })
}

// FIXME: labels array issue - ONLY last updated label will be displayed. doesnt matter deleted or created
// reason is that we pass {type: "labels-delete", data: ["bug"]} while we overwrite the labels attribute
export async function PUT(request: NextRequest, {
  params,
}: { params: { id?: string | string[] } }) {
  const json = await request.json() as { type: EventType, data: string | number | string[] };
  const { type, data } = json;
  // store event
  const user = await getUser(request);
  createEvent(type, { data }, user);
  // update state
  const key = createStateKey(params.id);
  const attribute = removeSuffixEventType(type);
  await redis.json.set(key, `$.${attribute}`, JSON.stringify(data));
  await redis.expire(key, TTL);

  return new Response("Updated", { status: 201 })
}

export async function DELETE(request: Request, {
  params,
}: { params: { id?: string | string[] } }) {
  // delete state
  const key = createStateKey(params.id)
  await redis.del(key)
  return new Response("Deleted", { status: 200 })
}