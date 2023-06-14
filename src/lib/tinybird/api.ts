import { NextRequest } from "next/server";
import { Body } from "./validation";

type Event = Body & Record<"user_id" | "id", string>;

export async function createEvent({ value, ...rest }: Event) {
  // const timestamp = new Date(Date.now()).toISOString(); // timezone compatible
  const timestamp = Date.now(); // Unix epoch
  const res = fetch("https://api.tinybird.co/v0/events?name=events_example", {
    method: "POST",
    body: JSON.stringify({
      timestamp,
      value: JSON.stringify(value),
      ...rest,
    }),
    headers: {
      Authorization: `Bearer ${process.env.TINYBIRD_TOKEN}`,
    },
  });
  return res;
}

export async function getEvents(key: string) {
  // TODO: include key into request
  return await fetch(
    `https://api.tinybird.co/v0/pipes/events_pipe.json?key=${key}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TINYBIRD_TOKEN}`,
      },
    }
  );
}

export async function deleteEvents(key: string) {
  return await fetch(
    `https://api.tinybird.co/v0/datasources/events_example/delete?delete_condition=(id='${key}')`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TINYBIRD_TOKEN}`,
      },
    }
  );
}

// create Middleware - currently not working...
export async function withEvent<T extends Request | NextRequest, P>(
  handler: (req: T, { params }: { params: P }) => Promise<Response>
) {
  console.log("hello world!", handler);
  return async (req: T, { params }: { params: P }) => {
    try {
      console.log({ req, params });
    } catch (e) {
      console.log(e);
    }
    return handler(req, { params });
  };
}

// REMINDER: Tinybird
// 1. An object property like { user: { name: "mxkaske", id: 1 } }
//    will be transformed to user_name and user_id
// 2. This also belongs to arrays. They automatically gets converted to Array(String) schema and
//    you will need to use JSON.stringify(data) to keep it as a string
