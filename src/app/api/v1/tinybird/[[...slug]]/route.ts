import {
  bodySchema,
  createEvent,
  deleteEvents,
  getEvents,
} from "@/lib/tinybird";
import { NextRequest } from "next/server";

type Params = { slug: string | string[] | undefined };

// move to utils
function createKey(slug: Params["slug"], appendix?: string) {
  return slug
    ? ["evnt", ...(Array.isArray(slug) ? slug : [slug])].join(":")
    : "evnt";
}

export const GET = async (req: Request, { params }: { params: Params }) => {
  const key = createKey(params.slug);
  const res = await getEvents(key);
  const json = await res.json();
  // const { meta, data } = json;
  return new Response(JSON.stringify(json), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Params }
) => {
  // auth - move into differen folder?
  const cookiesList = req.cookies;
  const hasId = cookiesList.has("userId");
  const userId = (hasId && cookiesList.get("userId")?.value) || "1";
  //
  const json = await req.json();
  const body = bodySchema.safeParse(json);
  console.log(body);
  if (!body.success) {
    return new Response("Error", { status: 500 });
  }
  const key = createKey(params.slug);
  await createEvent({ user_id: userId, id: key, ...body.data });
  return new Response("OK", { status: 200 });
};

// TODO: check
export const DELETE = async (_: Request, { params }: { params: Params }) => {
  const key = createKey(params.slug);
  await deleteEvents(key);
  return new Response("OK", { status: 200 });
};
