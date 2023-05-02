import { EventData } from "@/types/events";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ActivityIcon from "../activity/activity-icon";
import { formatDistanceStrict } from "date-fns";

export default function Comment({ event }: { event: EventData }) {
  return (
    <div className="relative flex items-start">
      <div className="relative px-1 mr-3">
        {/* Include Avatar here instead - see tailwindui? */}
        <ActivityIcon name="comment" timestamp={event.timestamp} />
      </div>
      <div className="min-w-0 flex-1 rounded-md border border-input p-2 -my-2 -ml-2">
        <div className="flex">
          <div className="h-8 flex items-center mr-1">
            <a href="#">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={event.user.avatar}
                  alt={event.user.username}
                />
                <AvatarFallback>
                  {event.user.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </a>
          </div>
          <div className="text-sm leading-7 text-muted-foreground">
            <span className="mr-0.5">
              <a href="#" className="font-medium text-foreground">
                {event.user.username}
              </a>{" "}
              commented
            </span>{" "}
            <span className="whitespace-nowrap">
              {formatDistanceStrict(new Date(event.timestamp), new Date())} ago
            </span>
          </div>
        </div>
        <p className="text-sm mt-0.5">
          {!Array.isArray(event.type) && event[event.type].data}
        </p>
      </div>
    </div>
  );
}
