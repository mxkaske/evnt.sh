import redis from "@/lib/redis";
import { EVENT_USER } from "@/constants/event";

const user = EVENT_USER;

export const revalidate = 0;

type Slug = string | string[] | undefined

// Normally only POST and PUT request are allowed!

function createEventKey(slug: Slug) {
  return slug ? ["events", ...(Array.isArray(slug) ? slug : [slug])].join(":") : "events"
}

export async function GET(request: Request, {
  params,
}: { params: { slug: Slug } }) {
  const { slug } = params;
  const eventKey = createEventKey(slug);
  const events = await redis.zrange(eventKey, 0, -1);
  return new Response(JSON.stringify(events), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request, {
  params,
}: { params: {slug: Slug}}) {
  const { slug } = params;
  const res = await request.json();
  const timestamp = new Date().getTime();
  const { type, data } = res
  const event = { type, [type]: { data }, timestamp, user }; // REMINDER: works only if type is not an array
  const eventKey = createEventKey(slug);
  await redis.zadd(eventKey, {
    score: timestamp,
    member: JSON.stringify(event),
  });
  return new Response("Event created", { status: 201 });
}

// DANGEROUS - shouldn't be used!
export async function DELETE(request: Request, {
  params,
}: { params: {slug: Slug}}) {
  const { slug } = params;
  const eventKey = createEventKey(slug);
  await redis.del(eventKey);
  return new Response("Event deleted", { status: 202 });
}
