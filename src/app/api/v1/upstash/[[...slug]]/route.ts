import {
  createState,
  deleteState,
  readState,
  updateState,
} from "@/lib/upstash";
import { NextRequest } from "next/server";

// TODO: add validation and type safety-ness

export const revalidate = 0;

type Params = { slug: string | string[] | undefined };

function createKey(slug: Params["slug"]) {
  return slug
    ? ["evnt", ...(Array.isArray(slug) ? slug : [slug])].join(":")
    : "evnt";
}

export async function GET(request: Request, { params }: { params: Params }) {
  const key = createKey(params.slug);
  const state = await readState(key);
  return new Response(JSON.stringify(state), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const json = await request.json();
  const key = createKey(params.slug);
  await createState(key, json);
  return new Response("Created", { status: 201 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { name, value } = await request.json();
  const key = createKey(params.slug);
  try {
    await updateState(key, name, value);
  } catch {
    // UpstashError: ERR new objects must be created at the root
    await createState(key, { [name]: value });
  }
  return new Response("Updated", { status: 201 });
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const key = createKey(params.slug);
  await deleteState(key);
  return new Response("Deleted", { status: 200 });
}
