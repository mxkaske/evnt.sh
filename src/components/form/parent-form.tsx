import { BASE_URL } from "@/constants/fetch";
import { asyncComponent } from "@/lib/hack";
import { TinyData } from "@/lib/tinybird";
import { UpstashData } from "@/lib/upstash";
import TitleForm from "./title";
import LabelForm from "./label";
import StatusForm from "./status";

// usePathname is a client-side function
async function ParentForm({ appendix }: { appendix: string }) {
  const eventsRes = await fetch(`${BASE_URL}/api/v0/state/${appendix}`);
  // get only a restricted amount of events to build the state;
  const events = (await eventsRes.json()) as { data: TinyData[] } | undefined;

  const state = events?.data.reduce((prev, curr) => {
    if (curr.method !== "delete") {
      // @ts-ignore
      prev[curr?.name] = JSON.parse(`${curr?.value}`);
    }
    return prev;
  }, {}) as UpstashData;

  console.log(state);

  return (
    <div className="grid gap-4">
      <TitleForm defaultValue={state?.title} />
      <LabelForm defaultValues={state?.labels} />
      <StatusForm defaultValue={state?.status} />
    </div>
  );
}

export default asyncComponent(ParentForm);
