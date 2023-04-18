import { EventData } from "@/types/events";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ActivityIcon from "../activity/activity-icon";
import ActivityTimestamp from "../activity/activity-timestamp";

export default function Comment({ event }: { event: EventData }) {
  return (
    <div className="relative flex items-start space-x-3">
      <div>
        <div className="relative px-1">
          <ActivityIcon name="comment" />
        </div>
      </div>
      <div className="min-w-0 flex-1 py-0">
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
          <div className="text-sm leading-7 text-gray-500">
            <span className="mr-0.5">
              <a href="#" className="font-medium text-gray-900">
                {event.user.username}
              </a>{" "}
              commented
            </span>{" "}
            <ActivityTimestamp timestamp={event.timestamp} />
          </div>
        </div>
        <p className="rounded-md border border-input bg-transparent px-3 py-2 text-sm mt-0.5">
          {event.data}
        </p>
      </div>
    </div>
  );
}
