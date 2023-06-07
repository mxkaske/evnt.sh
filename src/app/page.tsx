import { EventData } from "@/types/events";
import LabelForm from "@/components/form/label";
import StatusForm from "@/components/form/status";
import { State } from "@/types/states";
import TitleForm from "@/components/form/title";
import CommentForm from "@/components/form/comment";
import { Separator } from "@/components/ui/separator";
import DeleteButton from "./components/delete-button";
import { BASE_URL } from "@/constants/fetch";
import { ModeToggle } from "@/components/theme/mode-toggle";
import EmptyState from "./components/empty-state";
import History from "@/components/feed/history";
import { Button } from "@/components/ui/button";
import { WaitlistDialog } from "@/components/waitlist/dialog";
import SwitchUser from "@/components/feed/switch-user";

export const revalidate = 0;

export default async function Home() {
  const eventsRes = await fetch(`${BASE_URL}/api/v1/events`);
  const stateRes = await fetch(`${BASE_URL}/api/v1/states`);
  const events = (await eventsRes.json()) as EventData[];
  const state = (await stateRes.json()) as State | undefined;
  const isEmpty = !state
  return (
    <main className="min-h-screen container max-w-5xl mx-auto flex flex-col py-4 md:py-8 px-3 md:px-6 space-y-8">
      <header className="flex items-center justify-between space-x-4">
        <h1 className="font-bold text-3xl blur-md">evnt.sh</h1>
        {/* Hmm, not convinced. we will need a user to create */}
        {isEmpty ? null : <SwitchUser />}
      </header>
      <div>
        <p className="text-muted-foreground max-w-md mb-4">Streamline the process of tracking and displaying updates, enabling collaboration and project management.</p>
        <div className="space-x-2">
          <WaitlistDialog />
          <Button variant="link">Star on GitHub</Button>
        </div>
      </div>
      {isEmpty ? <div className="flex-1">
        <EmptyState />
      </div> :
        <div className="flex flex-col items-center gap-8 mb:gap-4 flex-1">
          <div className="grid md:grid-cols-3 gap-12 w-full">
            <div className="col-span-1 md:col-span-2">
              <p className="text-sm text-muted-foreground mb-4">Activity Feed</p>
              {events.length > 0 ? <History events={events} /> : null}
              <CommentForm />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-muted-foreground mb-4">Current State</p>
              <TitleForm defaultValue={state.title || undefined} />
              <Separator className="my-4" />
              <LabelForm defaultValues={state.labels || undefined} />
              <Separator className="my-4" />
              <StatusForm defaultValue={state.status || undefined} />
              <Separator className="my-4" />
              <div className="w-full text-right">
                <DeleteButton />
              </div>
            </div>
          </div>
        </div>
      }
      <div className="text-right">
        <ModeToggle />
      </div>
    </main>
  );
}
