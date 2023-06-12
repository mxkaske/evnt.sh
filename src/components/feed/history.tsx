import { EventData } from "@/types/events";
import Label from "./label";
import Status from "./status";
import Title from "./title";
import Comment from "./comment";

export default function History({ events }: { events: EventData[] }) {
  return (
    <div className="flow-root mb-8">
      <ul role="list" className="-mb-8">
        {/* move to components/activity */}
        {/* do we want to filter "title-create" event? */}
        {events.map((event, i) => {
          function renderEvent() {
            if (
              !Array.isArray(event.type) &&
              event.type.startsWith("labels-")
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
              event.type.startsWith("status-")
            ) {
              return <Status key={event.timestamp} {...{ event }} />;
            }
            if (
              !Array.isArray(event.type) &&
              event.type.startsWith("title-")
            ) {
              return <Title key={event.timestamp} {...{ event }} />;
            }
            if (
              !Array.isArray(event.type) &&
              event.type.startsWith("comment-")
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
  )
}