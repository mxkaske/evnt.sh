import kafka from "@/lib/kafka";

export const revalidate = 0;

const TOPIC = process.env.UPSTASH_KAFKA_TOPIC!;

export async function GET(request: Request) {
  const c = kafka.consumer();
  const res = await c.fetch({
    topic: TOPIC,
    partition: 0,
    // REMINDER: because we are only storing data for a day, need to update it each time - otherwise throws `UpstashError: Fetch position FetchPosition`
    offset: 25, // offset is the data number
    timeout: 1000,
  });
  console.log(res);
  return new Response(JSON.stringify(res), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
