import { EventData } from "@/types/events";
import Example from "./ExampleFeed";
import LabelForm from "@/components/form/label";
import StatusForm from "@/components/form/status";
import Label from "@/components/feed/label";
import Status from "@/components/feed/status";
import { State } from "@/types/states";
import TitleForm from "@/components/form/title";
import Title from "@/components/feed/title";

export const revalidate = 0;

export default async function Home() {
  const eventsRes = await fetch("http://127.0.0.1:3000/api/v1/events");
  const stateRes = await fetch("http://127.0.0.1:3000/api/v1/states");
  const events = (await eventsRes.json()) as EventData[];
  const state = (await stateRes.json()) as State;
  console.log(state);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-center text-3xl">Event Sourcing</h1>
      <div className="grid grid-cols-4">
        {/* Compine both together: current & change */}
        <div>
          <div>Current State</div>
          <div>title: {state.title}</div>
          <div>labels: {state.labels.join(", ")}</div>
          <div>status: {state.status}</div>
        </div>
        <div>
          <h1>Change State</h1>
          <TitleForm defaultValue={state.title || undefined} />
          <LabelForm />
          <StatusForm defaultValue={state.status || undefined} />
        </div>
        <div className="col-span-2">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {events.map((event, i) => {
                function renderEvent() {
                  if (event.type === "add-label") {
                    return <Label key={event.timestamp} {...{ event }} />;
                  }
                  if (event.type === "update-status") {
                    return <Status key={event.timestamp} {...{ event }} />;
                  }
                  if (event.type === "update-title") {
                    return <Title key={event.timestamp} {...{ event }} />;
                  }
                }
                return (
                  <li key={event.timestamp}>
                    <div className="relative pb-8">
                      {i !== events.length - 1 ? (
                        <span
                          className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex items-start space-x-3">
                        {renderEvent()}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* <div className="max-w-md">
          <Example />
        </div> */}
      </div>
    </main>
  );
}
