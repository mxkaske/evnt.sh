import { Badge } from "../ui/badge";
import ActivityIcon from "../activity/activity-icon";
import { formatDistance } from "date-fns";
import ActivityUserAvatar from "../activity/activity-user-avatar";
import ActivityUserName from "../activity/activity-user-name";
import { TinyData } from "@/lib/tinybird";
import { USERS } from "@/constants/users";

// TODO: brain work regarding metadata

export default function Label({
  value,
  user_id,
  timestamp,
  metadata,
}: TinyData) {
  const meta = metadata ? JSON.parse(`${metadata}`) : {};
  const { added, removed } = meta as { added: string[]; removed: string[] };
  const hasRemoved = removed?.length > 0;
  const hasAdded = added?.length > 0;
  const hasBoth = hasAdded && hasRemoved;
  const user = USERS.find((user) => user.id === Number(user_id)) || USERS[1];
  return (
    <div className="relative flex items-start space-x-3">
      <div className="relative px-1">
        <ActivityIcon name="label" />
      </div>
      <div className="min-w-0 flex-1 py-0 flex">
        <div className="h-8 flex items-center mr-1">
          <ActivityUserAvatar user={user} />
        </div>
        <div className="text-sm leading-7 text-muted-foreground">
          <span className="mr-0.5">
            <ActivityUserName user={user} />
          </span>{" "}
          {hasAdded && (
            <>
              added tag{" "}
              <span className="mx-0.5 space-x-0.5">
                {added.map((d) => (
                  <Badge key={d} variant="outline">
                    {d}
                  </Badge>
                ))}{" "}
              </span>
            </>
          )}
          {hasBoth && ` and `}
          {hasRemoved && (
            <>
              removed tag{" "}
              <span className="mx-0.5 space-x-0.5">
                {removed.map((d) => (
                  <Badge key={d} variant="outline">
                    {d}
                  </Badge>
                ))}{" "}
              </span>
            </>
          )}
          <span className="whitespace-nowrap">
            {formatDistance(new Date(timestamp), new Date())} ago
          </span>
        </div>
      </div>
    </div>
  );
}
