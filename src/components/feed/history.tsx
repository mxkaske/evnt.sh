import Label from "./label";
import Status from "./status";
import Title from "./title";
import Comment from "./comment";
import { BASE_URL } from "@/constants/fetch";
import { TinyData } from "@/lib/tinybird";

export default async function History() {
  const tinyRes = await fetch(`${BASE_URL}/api/v1/tinybird`);
  const tiny = (await tinyRes.json()) as { data: TinyData[] };
  console.log({ tiny });
  return (
    <div className="flow-root mb-8">
      <ul role="list" className="-mb-8">
        {/* move to components/activity */}
        {/* OPTIMIZE?!? */}
        {tiny?.data?.map((event, i) => {
          const key = event.timestamp;
          function renderEvent() {
            if (!Array.isArray(event.name) && event.name.startsWith("labels")) {
              return <Label key={key} {...event} />;
            }
            if (!Array.isArray(event.name) && event.name.startsWith("status")) {
              return <Status key={key} {...event} />;
            }
            if (!Array.isArray(event.name) && event.name.startsWith("title")) {
              return <Title key={key} {...event} />;
            }
            if (
              !Array.isArray(event.name) &&
              event.name.startsWith("comment")
            ) {
              return <Comment key={key} {...event} />;
            }
          }
          return (
            <li key={key}>
              <div className="relative pb-8">
                {i !== tiny.data.length - 1 ? (
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
  );
}
