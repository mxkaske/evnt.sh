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

type EventBase<T> = {
  type: T | T[];
  timestamp: number;
  user: EventUserType;
};

export type EventDataType<T extends EventType> = EventBase<T> & {
  [K in T]: {
    data: string;
  };
};

const a = {
  type: ["add-comment", "remove-label"],
  timestamp: 0,
  user: {
    id: 0,
    username: "",
    avatar: "",
  },
  "add-comment": {
    data: "",
  },
  "remove-label": {
    data: "",
  },
} satisfies EventDataType<"add-comment" | "remove-label">;
