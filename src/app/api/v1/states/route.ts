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

  // TODO: this is a static prototype and is not for production use
  events.map((event) => {
    const type = event.type;
    if (!Array.isArray(type)) {
      const data = event[type].data;
      if (!Array.isArray(data)) {
        if (event.type === "add-label") {
          state.labels = [...state.labels, data];
        } else if (event.type === "update-status") {
          state.status = data;
        } else if (event.type === "update-title") {
          state.title = data;
        }
      } else {
        if (event.type === "add-label") {
          state.labels = [...state.labels, ...data];
        }
      }
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
