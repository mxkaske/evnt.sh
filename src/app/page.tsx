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
import { cookies } from "next/headers";
import { TinyData } from "@/lib/tinybird";
import { UpstashData } from "@/lib/upstash";
import ParentForm from "@/components/form/parent-form";

export const revalidate = 0;

export default async function Home() {
  const cookieList = cookies();
  const stateRes = await fetch(`${BASE_URL}/api/v1/upstash`);
  const state = (await stateRes.json()) as UpstashData | undefined;
  const tinyRes = await fetch(`${BASE_URL}/api/v1/tinybird`);
  const tiny = (await tinyRes.json()) as TinyData[];
  const isEmpty = !(tiny && state);
  // console.log({ tiny, state });
  return (
    <main className="min-h-screen container max-w-5xl mx-auto flex flex-col py-4 md:py-8 px-3 md:px-6 space-y-8">
      <header className="flex items-center justify-between space-x-4">
        <h1 className="font-bold text-3xl blur-md">evnt.sh</h1>
        {isEmpty ? null : <SwitchUser />}
      </header>
      <div>
        <p className="text-muted-foreground max-w-md mb-4">
          Streamline the process of tracking and displaying updates, enabling
          collaboration and project management.
        </p>
        <div className="space-x-2">
          <WaitlistDialog />
          {/* TODO: move to Client Component for onClick */}
          <Button variant="link">Star on GitHub</Button>
        </div>
      </div>
      {isEmpty ? (
        <div className="flex-1">
          <EmptyState />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 mb:gap-4 flex-1">
          <div className="grid md:grid-cols-3 gap-12 w-full">
            <div className="col-span-1 md:col-span-2">
              <p className="text-sm text-muted-foreground mb-4">
                Activity Feed
              </p>
              <History />
              <CommentForm />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-muted-foreground mb-4">
                Current State
              </p>
              <ParentForm />
              <Separator className="my-6" />
              <div className="w-full text-right">
                <DeleteButton />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="text-right">
        <ModeToggle />
      </div>
    </main>
  );
}
