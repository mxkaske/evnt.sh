import { EventUserType } from "@/types/events";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ActivityUserProps {
  user: EventUserType; // EventData["user"]
}

export default function ActivityUser({ user }: ActivityUserProps) {
  return (
    <div className="flex">
      <div className="h-8 flex items-center mr-1">
        <a href="#">
          <Avatar className="h-6 w-6">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </a>
      </div>
      <div>
        <a href="#" className="font-medium text-gray-900">
          {user.username}
        </a>
      </div>
    </div>
  );
}
