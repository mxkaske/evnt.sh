import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

type Params = { slug: string | string[] | undefined };

function createKey(slug: Params["slug"]) {
  return slug ? [...(Array.isArray(slug) ? slug : [slug])].join(":") : "_root";
}

export async function GET(_: Request, { params }: { params: Params }) {
  const key = createKey(params.slug);
  const state = await redis.json.get(key);
  return new Response(JSON.stringify(state), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request, { params }: { params: Params }) {
  const json = await request.json();
  const key = createKey(params.slug);
  await redis.json.set(key, "$", JSON.stringify(json));
  return new Response("Created", { status: 201 });
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const { name, value } = await request.json();
  const key = createKey(params.slug);
  try {
    await redis.json.set(key, `$.${name}`, JSON.stringify(value));
  } catch {
    // UpstashError: ERR new objects must be created at the root
    await redis.json.set(key, "$", { [name]: JSON.stringify(value) });
  }
  return new Response("Updated", { status: 201 });
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const key = createKey(params.slug);
  await redis.del(key);
  return new Response("Deleted", { status: 200 });
}
