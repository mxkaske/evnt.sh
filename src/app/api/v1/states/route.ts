import { INITIAL_STATE } from "@/constants/state";
import redis from "@/lib/redis";
import { EventData } from "@/types/events";
import { State } from "@/types/states";

export const revalidate = 0;

// If including a query params timestamp, we could role back to any previous version!
export async function GET(request: Request) {
  // TODO: MOVE to lib/events getCurrentState
  const state: State = INITIAL_STATE;
  const events = await redis.zrange<EventData[]>("events", 0, -1);

  // TODO: this is a static prototype
  events.map((event) => {
    console.log(event);
    if (event.type === "add-label") {
      state.labels.push(event[event.type].data);
    } else if (event.type === "update-status") {
      state.status = event[event.type].data;
    } else if (event.type === "update-title") {
      state.title = event[event.type].data;
    }
    // else if (event.type.startsWith("remove")) {
    //   // remove label!
    // }
    // ...
  });

  console.log(state);

  // TODO: store result inside of cache - and only calculate missing timestamp events
  // redis.set()
  // redis.ttl()

  return new Response(JSON.stringify(state), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
