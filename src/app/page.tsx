import { EventData } from "@/types/events";
import LabelForm from "@/components/form/label";
import StatusForm from "@/components/form/status";
import Label from "@/components/feed/label";
import Status from "@/components/feed/status";
import { State } from "@/types/states";
import TitleForm from "@/components/form/title";
import Title from "@/components/feed/title";
import CommentForm from "@/components/form/comment";
import Comment from "@/components/feed/comment";
import { Separator } from "@/components/ui/separator";

const URL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : "http://127.0.0.1:3000";

export const revalidate = 0;

export default async function Home() {
  const eventsRes = await fetch(`${URL}/api/v1/events`);
  const stateRes = await fetch(`${URL}/api/v1/states`);
  const events = (await eventsRes.json()) as EventData[];
  const state = (await stateRes.json()) as State;
  console.log(state);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-center text-3xl mb-6">Event Sourcing</h1>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <TitleForm defaultValue={state.title || undefined} />
          <Separator className="my-4" />
          <LabelForm defaultValues={state.labels || undefined} />
          <Separator className="my-4" />
          <StatusForm defaultValue={state.status || undefined} />
        </div>
        <div className="col-span-2 space-y-12">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {events.map((event, i) => {
                function renderEvent() {
                  if (event.type.endsWith("-label")) {
                    return <Label key={event.timestamp} {...{ event }} />;
                  }
                  if (event.type.endsWith("-status")) {
                    return <Status key={event.timestamp} {...{ event }} />;
                  }
                  if (event.type.endsWith("-title")) {
                    return <Title key={event.timestamp} {...{ event }} />;
                  }
                  if (event.type.endsWith("-comment")) {
                    return <Comment key={event.timestamp} {...{ event }} />;
                  }
                }
                return (
                  <li key={event.timestamp}>
                    <div className="relative pb-8">
                      {i !== events.length - 1 ? (
                        <span
                          className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-accent"
                          aria-hidden="true"
                        />
                      ) : null}
                      {renderEvent()}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-full">
            <CommentForm />
          </div>
        </div>
      </div>
    </main>
  );
}
