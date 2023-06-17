import ActivityIcon from "../activity/activity-icon";
import { formatDistance } from "date-fns";
import ActivityUserAvatar from "../activity/activity-user-avatar";
import ActivityUserName from "../activity/activity-user-name";
import { TinyData } from "@/lib/tinybird";
import { USERS } from "@/constants/users";

export default function Title({ method, value, user_id, timestamp }: TinyData) {
  const text = `${method === "create" ? "created" : "updated"} title`;
  const user = USERS.find((user) => user.id === Number(user_id)) || USERS[1];
  const data = JSON.parse(`${value}`);
  return (
    <div className="relative flex items-start space-x-3">
      <div className="relative px-1">
        <ActivityIcon name="title" />
      </div>
      <div className="min-w-0 flex-1 py-0 flex">
        <div className="h-8 flex items-center mr-1">
          <ActivityUserAvatar user={user} />
        </div>
        <div className="text-sm leading-7 text-muted-foreground">
          <span className="mr-0.5">
            <ActivityUserName user={user} /> {text}
          </span>{" "}
          <span className="mr-0.5 font-semibold text-foreground">{data}</span>{" "}
          <span className="whitespace-nowrap">
            {formatDistance(new Date(timestamp), new Date())} ago
          </span>
        </div>
      </div>
    </div>
  );
}
