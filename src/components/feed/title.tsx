import { EventData } from "@/types/events";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ActivityIcon from "../activity/activity-icon";
import { formatDistanceStrict } from "date-fns";

export default function Title({ event }: { event: EventData }) {
  return (
    <div className="relative flex items-start space-x-3">
      <div className="relative px-1">
        <ActivityIcon name="title" />
      </div>
      <div className="min-w-0 flex-1 py-0 flex">
        <div className="h-8 flex items-center mr-1">
          <a href="#">
            <Avatar className="h-6 w-6">
              <AvatarImage src={event.user.avatar} alt={event.user.username} />
              <AvatarFallback>{event.user.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </a>
        </div>
        <div className="text-sm leading-7 text-muted-foreground">
          <span className="mr-0.5">
            <a href="#" className="font-medium text-foreground">
              {event.user.username}
            </a>{" "}
            updated title
          </span>{" "}
          <span className="mr-0.5 font-semibold text-foreground">
            {!Array.isArray(event.type) && event[event.type].data}
          </span>{" "}
          <span className="whitespace-nowrap">
            {formatDistanceStrict(new Date(event.timestamp), new Date())} ago
          </span>
        </div>
      </div>
    </div>
  );
}
