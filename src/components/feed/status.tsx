import { EventData } from "@/types/events";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import ActivityIcon from "../activity/activity-icon";
import { formatDistanceStrict } from "date-fns";

export default function Status({ event }: { event: EventData }) {
  return (
    <div className="relative flex items-start space-x-3">
      <div className="relative px-1">
        <ActivityIcon name="status" timestamp={event.timestamp} />
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
        <div className="text-sm leading-8 text-gray-500">
          <span className="mr-0.5">
            <a href="#" className="font-medium text-gray-900">
              {event.user.username}
            </a>{" "}
            updated status
          </span>{" "}
          <span className="mr-0.5">
            <a href="#">
              <Badge variant="outline">
                {!Array.isArray(event.type) && event[event.type].data}
              </Badge>
            </a>{" "}
          </span>
          <span className="whitespace-nowrap">
            {formatDistanceStrict(new Date(event.timestamp), new Date())} ago
          </span>
        </div>
      </div>
    </div>
  );
}
