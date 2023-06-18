import CommentForm from "@/components/form/comment";
import { Separator } from "@/components/ui/separator";
import DeleteButton from "../components/delete-button";
import { BASE_URL } from "@/constants/fetch";
import { ModeToggle } from "@/components/theme/mode-toggle";
import EmptyState from "../components/empty-state";
import History from "@/components/feed/history";
import { WaitlistDialog } from "@/components/waitlist/dialog";
import SwitchUser from "@/components/feed/switch-user";
import { TinyData } from "@/lib/tinybird";
import ParentForm from "@/components/form/parent-form";

export const revalidate = 0;

type Params = { slug: string | string[] | undefined };

// TODO: find a better way (utility, naming,...) than appendix
function createAppendix(slug: Params["slug"]) {
  return Array.isArray(slug) ? slug.join("/") : slug || "";
}

export default async function Home({ params }: { params: Params }) {
  const appendix = createAppendix(params.slug);
  const tinyRes = await fetch(`${BASE_URL}/api/v0/tinybird/${appendix}`);
  const tiny = (await tinyRes.json()) as { data: TinyData[] };
  const isEmpty = tiny.data.length === 0 || params.slug === undefined;
  return (
    <main className="min-h-screen container max-w-5xl mx-auto flex flex-col py-4 md:py-8 px-3 md:px-6 space-y-8">
      <header className="flex items-center justify-between space-x-4">
        <h1 className="font-bold text-3xl">evnt.sh</h1>
        {isEmpty ? null : <SwitchUser />}
      </header>
      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground max-w-md mb-1">
            Streamline the process of tracking and displaying updates, enabling
            collaboration and project management.
          </p>
          <p className="text-sm text-muted-foreground italic">
            Powered by{" "}
            <span className="text-foreground/90">Event Sourcing</span>.
          </p>
        </div>
        <div className="space-x-6">
          <WaitlistDialog />
          <a
            href="https://twitter.com/mxkaske"
            target="_blank"
            rel="noreferrer"
            className="text-sm rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background underline-offset-4 hover:underline text-primary"
          >
            Star on GitHub
          </a>
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
              <History appendix={appendix} />
              <CommentForm />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-muted-foreground mb-4">
                Current State
              </p>
              <ParentForm appendix={appendix} />
              <Separator className="my-6" />
              <div className="w-full text-right">
                <DeleteButton />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <a
            href="https://twitter.com/mxkaske"
            target="_blank"
            rel="noreferrer"
            className="rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background underline-offset-4 hover:underline text-primary"
          >
            Twitter
          </a>
        </div>
        <div className="text-right">
          <ModeToggle />
        </div>
      </div>
    </main>
  );
}
