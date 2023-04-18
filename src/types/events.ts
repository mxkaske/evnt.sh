// DISCUSS:
export type EventStateType = "initial-state";

type Label = "label";
type Comment = "comment";
type Title = "title";
type Status = "status";

export type EventDeleteType = `remove-${Label}`;
export type EventCreateType = `add-${Label | Comment}`;
export type EventUpdateType = `update-${Title | Status}`;

// OR:
// type Command = "add" | "remove" | "change"
// type EventType = `${Command}-${Label | Comment | ...}`

export type EventType = EventCreateType | EventUpdateType | EventDeleteType;

export type EventUserType = {
  id: string | number;
  username: string;
  avatar: string;
};

export type EventData = EventDataType<EventType>;

// Lots of typescript magic
export type EventDataType<T extends EventType> = {
  type: T; // allow arrays
  timestamp: number;
  user: EventUserType;
} & {
  [K in T]: {
    data: string;
  };
};

const a = {
  type: "add-comment",
  timestamp: 0,
  user: {
    id: 0,
    username: "",
    avatar: "",
  },
  "add-comment": {
    data: "",
  },
} satisfies EventDataType<"add-comment">;
