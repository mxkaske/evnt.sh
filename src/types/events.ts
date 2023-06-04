// DISCUSS:
export type EventStateType = "initial-state";

type Labels = "labels";
type Comment = "comment";
type Title = "title";
type Status = "status";

export type EventDeleteType = `${Labels}-delete`;
export type EventCreateType = `${Labels | Comment}-create`;
export type EventUpdateType = `${Title | Status}-update`;

// OR:
// type Command = "add" | "remove" | "change"
// type EventType = `${Label | Comment | ...}-${Command}`

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
    data: string | string[]; // TODO: better definition
  };
};

const a = {
  type: ["comment-create", "labels-delete"],
  timestamp: 0,
  user: {
    id: 0,
    username: "",
    avatar: "",
  },
  "comment-create": {
    data: "",
  },
  "labels-delete": {
    data: "",
  },
} satisfies EventDataType<"comment-create" | "labels-delete">;
