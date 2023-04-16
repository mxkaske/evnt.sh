// DISCUSS:
export type EventStateType = "initial-state";

export type EventDeleteType = "remove-label";
export type EventCreateType = "add-label" | "add-comment";
export type EventUpdateType = "update-title" | "update-status";

export type EventType = EventCreateType | EventUpdateType | EventDeleteType;

export type EventData = {
  type: EventType;
  // how to work with arrays?
  data: string; // TODO: move to typesafe [K in EventType]
  user: string; // TODO: extend to proper type
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
