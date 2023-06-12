import { EventData } from "@/types/events";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ActivityIcon from "../activity/activity-icon";
import { formatDistanceStrict } from "date-fns";
import ActivityUserAvatar from "../activity/activity-user-avatar";
import ActivityUserName from "../activity/activity-user-name";

export default function Comment({ event }: { event: EventData }) {
  return (
    <div className="relative flex items-start">
      <div className="relative px-1 mr-3">
        <ActivityIcon name="comment" />
      </div>
      <div className="min-w-0 flex-1 rounded-md border border-input p-2 -my-2 -ml-2">
        <div className="flex">
          <div className="h-8 flex items-center mr-1">
            <ActivityUserAvatar user={event.user} />
          </div>
          <div className="text-sm leading-7 text-muted-foreground">
            <span className="mr-0.5">
              <ActivityUserName user={event.user} />{" "}
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
