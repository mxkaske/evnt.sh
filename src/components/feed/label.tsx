import { EventData } from "@/types/events";
import { TagIcon } from "@heroicons/react/24/solid";
import { formatDistanceStrict } from "date-fns";

export default function Label({ event }: { event: EventData }) {
  return (
    <>
      <div>
        <div className="relative px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
            <TagIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 py-0">
        <div className="text-sm leading-7 text-gray-500">
          <span className="mr-0.5">
            <a href="#" className="font-medium text-gray-900">
              {event.user}
            </a>{" "}
            added tag
          </span>{" "}
          <span className="mr-0.5">
            <a
              href="#"
              className="relative inline-flex items-center rounded-full px-2.5 py-1 text-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <span className="absolute flex flex-shrink-0 items-center justify-center">
                <span
                  className={`bg-gray-500 h-1.5 w-1.5 rounded-full`}
                  aria-hidden="true"
                />
              </span>
              <span className="ml-3 font-semibold text-gray-900">
                {event.data}
              </span>
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