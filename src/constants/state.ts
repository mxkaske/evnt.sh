import { State } from "@/types/states";

export const LABELS = [
  "bug",
  "documentation",
  "duplicate",
  // "enhancement",
  "question",
];

export const INITIAL_STATE: State = {
  title: "",
  status: "Ready",
  labels: [],
};

// export class EventsState {
//   state: State;

//   constructor() {
//     this.state = INITIAL_STATE;
//   }
// }
