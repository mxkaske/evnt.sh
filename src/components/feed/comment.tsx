import ActivityIcon from "../activity/activity-icon";
import { formatDistanceStrict } from "date-fns";
import ActivityUserAvatar from "../activity/activity-user-avatar";
import ActivityUserName from "../activity/activity-user-name";
import { USERS } from "@/constants/users";
import { TinyData } from "@/lib/tinybird";

export default function Comment({ user_id, value, timestamp }: TinyData) {
  const user = USERS.find((user) => user.id === Number(user_id)) || USERS[1];
  const data = JSON.parse(`${value}`);
  return (
    <div className="relative flex items-start">
      <div className="relative px-1 mr-3">
        <ActivityIcon name="comment" />
      </div>
      <div className="min-w-0 flex-1 rounded-md border border-input p-2 -my-2 -ml-2">
        <div className="flex">
          <div className="h-8 flex items-center mr-1">
            <ActivityUserAvatar user={user} />
          </div>
          <div className="text-sm leading-7 text-muted-foreground">
            <span className="mr-0.5">
              <ActivityUserName user={user} /> commented
            </span>{" "}
            <span className="whitespace-nowrap">
              {formatDistanceStrict(new Date(timestamp), new Date())} ago
            </span>
          </div>
        </div>
        <p className="text-sm mt-0.5">{data}</p>
      </div>
    </div>
  );
}
