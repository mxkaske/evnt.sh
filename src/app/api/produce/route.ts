import kafka from "@/lib/kafka";

export const revalidate = 0;

const TOPIC = process.env.UPSTASH_KAFKA_TOPIC!;

export async function GET(request: Request) {
  const p = kafka.producer();
  const message = { hello: "wrrrld" };
  const res = await p.produce(TOPIC, message);
  console.log(res);
  return new Response(JSON.stringify(res), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
