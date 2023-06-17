import { BASE_URL } from "@/constants/fetch";
import { asyncComponent } from "@/lib/hack";
import { TinyData } from "@/lib/tinybird";
import { UpstashData } from "@/lib/upstash";
import TitleForm from "./title";
import { Separator } from "@/components/ui/separator";
import LabelForm from "./label";
import StatusForm from "./status";

// add
async function ParentForm() {
  const eventsRes = await fetch(`${BASE_URL}/api/v1/state`);
  // get only a restricted amount of events to build the state;
  const events = (await eventsRes.json()) as { data: TinyData[] } | undefined;
  console.log(events?.data);

  const state = events?.data.reduce((prev, curr) => {
    if (curr.method !== "delete") {
      // @ts-ignore
      prev[curr?.name] = JSON.parse(`${curr?.value}`);
    }
    return prev;
  }, {}) as UpstashData;

  return (
    <div className="grid gap-4">
      <TitleForm defaultValue={state?.title} />
      <LabelForm defaultValues={state?.labels} />
      <StatusForm defaultValue={state?.status} />
    </div>
  );
}

export default asyncComponent(ParentForm);
