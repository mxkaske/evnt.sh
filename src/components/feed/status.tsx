import { EventData } from "@/types/events";
import { Badge } from "../ui/badge";
import ActivityIcon from "../activity/activity-icon";
import { formatDistanceStrict } from "date-fns";
import ActivityUserAvatar from "../activity/activity-user-avatar";
import ActivityUserName from "../activity/activity-user-name";

export default function Status({ event }: { event: EventData }) {
  return (
    <div className="relative flex items-start space-x-3">
      <div className="relative px-1">
        <ActivityIcon name="status" />
      </div>
      <div className="min-w-0 flex-1 py-0 flex">
        <div className="h-8 flex items-center mr-1">
          <ActivityUserAvatar user={event.user} />
        </div>
        <div className="text-sm leading-8 text-muted-foreground">
          <span className="mr-0.5">
            <ActivityUserName user={event.user} />{" "}
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
