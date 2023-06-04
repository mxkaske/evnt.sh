import { INITIAL_STATE } from "@/constants/state";
import { createEvent } from "@/lib/events";
import redis from "@/lib/redis";
import { EventType } from "@/types/events";
import { State } from "@/types/states";

export const revalidate = 0;

function removeSuffixType(word: string) {
  return word.replace(/-(create|update|delete)$/, '')
}

// DISCUSS: add zod for json validation
// TODO: create wrapper for createEvent

export async function GET() {
  const state = await redis.json.get("state") as State | undefined
  return new Response(JSON.stringify(state), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// TODO: CREATE NEW STATE - no event triggered for now
export async function POST(request: Request) {
  const json = await request.json()
  const data = { ...INITIAL_STATE, ...json }
  await redis.json.set("state", "$", JSON.stringify(data))

  return new Response("Created", {
    status: 201
  })
}

// TODO: fix labels array issue - ONLY last updated label will be displayed. doesnt matter deleted or created
export async function PUT(request: Request) {
  const json = await request.json()
  const { type, data } = json as { type: EventType, data: string | number | string[] };
  createEvent(type, { data });
  const attribute = removeSuffixType(type);
  await redis.json.set("state", `$.${attribute}`, JSON.stringify(data));
  return new Response("Updated", {
    status: 201
  })
}

export async function DELETE(request: Request) {
  await redis.del("state")
  return new Response("Deleted", {
    status: 200
  })
}