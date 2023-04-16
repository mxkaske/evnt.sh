import redis from "@/lib/redis";
import { EventData } from "@/types/events";
import { State } from "@/types/states";

export const revalidate = 0;

// If including a query params timestamp, we could role back to any previous version!
export async function GET(request: Request) {
  // TODO: MOVE to lib/events getCurrentState
  const initialState: State = {
    title: "",
    labels: [],
    status: "ready",
  };
  const events = await redis.zrange<EventData[]>("events", 0, -1);

  // TODO: this is a static prototype
  events.map((event) => {
    if (event.type === "add-label") {
      initialState.labels.push(event.data);
    } else if (event.type === "update-status") {
      initialState.status = event.data;
    } else if (event.type === "update-title") {
      initialState.title = event.data;
    } else if (event.type.startsWith("remove")) {
      // remove label!
    }
    // ...
  });

  // TODO: store result inside of cache - and only calculate missing timestamp events
  // redis.set()
  // redis.ttl()

  return new Response(JSON.stringify(initialState), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
