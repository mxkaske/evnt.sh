import { EventData } from "@/types/events";
import { PencilIcon } from "@heroicons/react/24/solid";
import { formatDistanceStrict } from "date-fns";

export default function Title({ event }: { event: EventData }) {
  return (
    <>
      <div>
        <div className="relative px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
            <PencilIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 py-0">
        <div className="text-sm leading-7 text-gray-500">
          <span className="mr-0.5">
            <a href="#" className="font-medium text-gray-900">
              {event.user}
            </a>{" "}
            changed title
          </span>{" "}
          <span className="mr-0.5 font-semibold text-gray-900">
            {event.data}
          </span>{" "}
          <span className="whitespace-nowrap">
            {formatDistanceStrict(new Date(event.timestamp), new Date())} ago
          </span>
        </div>
      </div>
    </>
  );
}
