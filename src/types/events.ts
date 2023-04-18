// DISCUSS:
export type EventStateType = "initial-state";

export type EventDeleteType = "remove-label";
export type EventCreateType = "add-label" | "add-comment";
export type EventUpdateType = "update-title" | "update-status";

// TODO: create string literal with `remove-${eventName}`, `add-${eventName}`

export type EventType = EventCreateType | EventUpdateType | EventDeleteType;

export type EventUserType = {
  id: string | number;
  username: string;
  avatar: string;
};

export type EventData = {
  type: EventType; // could be an array to allow multiple types at once!
  // how to work with arrays?
  data: string; // TODO: move to typesafe [K in EventType]
  user: EventUserType; // TODO: extend to proper type
  timestamp: number;
};

// Lots of typescript magic
export type EventDataType<T extends EventType> = {
  type: T;
  timestamp: number;
  user: string;
} & {
  [K in T]: {
    title: string;
  };
};
