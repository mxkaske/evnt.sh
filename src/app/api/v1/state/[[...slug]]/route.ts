import { getState } from "@/lib/tinybird";

export const revalidate = 0;

type Params = { slug: string | string[] | undefined };

function createKey(slug: Params["slug"], appendix?: string) {
  return slug
    ? ["evnt", ...(Array.isArray(slug) ? slug : [slug])].join(":")
    : "evnt";
}

export const GET = async (req: Request, { params }: { params: Params }) => {
  const key = createKey(params.slug);
  const res = await getState(key);
  const json = await res.json();
  // const { meta, data } = json;
  return new Response(JSON.stringify(json), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
