import { INITIAL_STATE } from "@/constants/state";
import { EventData } from "@/types/events";

// DELETE?

// const events = timestamp
// ? await redis.zrange<EventData[]>("events", 0, Number(timestamp), {
//     byScore: true,
//   })
// : await redis.zrange<EventData[]>("events", 0, -1);

export function getCurrentState(events: EventData[]) {
  const state = INITIAL_STATE;
  // FIXME: hotfix avoids the duplicates - should be deleted?!?
  state.labels = [];
  state.status = undefined;

  events.map((event) => {
    const type = event.type;
    if (!Array.isArray(type)) {
      const data = event[type].data;
      if (!Array.isArray(data)) {
        if (event.type === "labels-create") {
          state.labels = [...state.labels, data];
        } else if (event.type === "status-update") {
          state.status = data;
        } else if (event.type === "title-update") {
          state.title = data;
        } else if (event.type === "labels-delete") {
          state.labels = state.labels.filter((label) => label !== data);
        }
      } else {
        if (event.type === "labels-create") {
          data.map((label) => state.labels.push(label));
        } else if (event.type === "labels-delete") {
          state.labels = state.labels.filter((label) => !data.includes(label));
        }
      }
    }
  });
  return state;
}
