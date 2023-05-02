import { INITIAL_STATE } from "@/constants/state";
import redis from "@/lib/redis";
import { EventData } from "@/types/events";

export const revalidate = 0;

// If including a query params timestamp, we could role back to any previous version!
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timestamp = searchParams.get("timestamp");
  const state = INITIAL_STATE;
  // FIXME: hotfix avoids the duplicates
  state.labels = [];
  state.status = undefined;

  const events = timestamp
    ? await redis.zrange<EventData[]>("events", 0, Number(timestamp), {
        byScore: true,
      })
    : await redis.zrange<EventData[]>("events", 0, -1);

  // TODO: this is a static prototype and is not for production use
  // IDEA: should be a function inside of a Class
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
        } else if (event.type === "remove-label") {
          state.labels = state.labels.filter((label) => label !== data);
        }
      } else {
        if (event.type === "add-label") {
          data.map((label) => state.labels.push(label));
        } else if (event.type === "remove-label") {
          state.labels = state.labels.filter((label) => !data.includes(label));
        }
      }
    }
  });

  // TODO: store result inside of cache - and only calculate missing timestamp events
  // redis.set()
  // redis.ttl()

  return new Response(JSON.stringify(state), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
