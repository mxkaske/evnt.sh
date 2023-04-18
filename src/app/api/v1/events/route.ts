import kafka from "@/lib/kafka";
import redis from "@/lib/redis";

export const revalidate = 0;

const TOPIC = process.env.UPSTASH_KAFKA_TOPIC!;

export async function GET(request: Request) {
  const lastOffset = await redis.get<number>("lastOffset");
  //
  // const c = kafka.consumer();
  // const res = await c.fetch({
  //   topic: TOPIC,
  //   partition: 0,
  //   offset: lastOffset || 0,
  //   timeout: 1000,
  // });
  //
  const events = await redis.zrange("events", 0, -1);
  return new Response(JSON.stringify(events), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const res = await request.json();
  const { type, user } = res;
  const timestamp = new Date().getTime();
  const event = { type, [type]: res[type], timestamp, user }; // REMINDER: works only if type is not an array
  //
  // const p = kafka.producer();
  // const res = await p.produce(TOPIC, [{ type, value: JSON.stringify(event) }]);
  // await redis.set("lastOffset", res.offset);
  //
  await redis.zadd("events", {
    score: timestamp,
    member: JSON.stringify(event),
  });
  return new Response("Event created", {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
