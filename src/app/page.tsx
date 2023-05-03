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
import DeleteButton from "./components/delete-button";
import { BASE_URL } from "@/constants/fetch";
import { ModeToggle } from "@/components/theme/mode-toggle";
import EmptyState from "./components/empty-state";

export const revalidate = 0;

export default async function Home() {
  const eventsRes = await fetch(`${BASE_URL}/api/v1/events`);
  const stateRes = await fetch(`${BASE_URL}/api/v1/states`);
  const events = (await eventsRes.json()) as EventData[];
  const state = (await stateRes.json()) as State;
  console.log(state);
  return (
    <main className="min-h-screen flex flex-col py-4 md:py-8 px-3 md:px-6">
      <div className="mb-4">
        <EmptyState />
      </div>
      <div className="flex flex-col items-center gap-4 flex-1">
        <h1 className="text-center font-bold text-3xl mb-6">Event Store</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <TitleForm defaultValue={state.title || undefined} />
            <Separator className="my-4" />
            <LabelForm defaultValues={state.labels || undefined} />
            <Separator className="my-4" />
            <StatusForm defaultValue={state.status || undefined} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <div className="flow-root mb-8">
              <ul role="list" className="-mb-8">
                {events.map((event, i) => {
                  function renderEvent() {
                    if (
                      !Array.isArray(event.type) &&
                      event.type.endsWith("-label")
                    ) {
                      return (
                        <Label
                          key={event.timestamp}
                          type={event.type}
                          {...{ event }}
                        />
                      );
                    }
                    if (
                      !Array.isArray(event.type) &&
                      event.type.endsWith("-status")
                    ) {
                      return <Status key={event.timestamp} {...{ event }} />;
                    }
                    if (
                      !Array.isArray(event.type) &&
                      event.type.endsWith("-title")
                    ) {
                      return <Title key={event.timestamp} {...{ event }} />;
                    }
                    if (
                      !Array.isArray(event.type) &&
                      event.type.endsWith("-comment")
                    ) {
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
            <Separator className="my-4" />
            <div className="w-full text-right">
              <DeleteButton />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <ModeToggle />
      </div>
    </main>
  );
}
