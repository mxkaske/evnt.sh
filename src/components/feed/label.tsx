import { EventData } from "@/types/events";
import { formatDistanceStrict } from "date-fns";
import { Tag } from "lucide-react";

export default function Label({ event }: { event: EventData }) {
  return (
    <>
      <div>
        <div className="relative px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
            <Tag className="h-4 w-4 text-gray-500" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 py-0">
        <div className="text-sm leading-7 text-gray-500">
          <span className="mr-0.5">
            <a href="#" className="font-medium text-gray-900">
              {event.user}
            </a>{" "}
            {event.type === "add-label" ? "added tag" : "removed tag"}
          </span>{" "}
          <span className="mr-0.5">
            <a
              href="#"
              className="relative inline-flex items-center rounded-full px-2.5 py-1 text-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <span className="font-semibold text-gray-900">{event.data}</span>
            </a>{" "}
          </span>
          <span className="whitespace-nowrap">
            {formatDistanceStrict(new Date(event.timestamp), new Date())} ago
          </span>
        </div>
      </div>
    </>
  );
}
