import { HardHat, MessageCircle, Pencil, Tag, User } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import ActivityCard from "./activity-card";

const ICONS = {
  user: User,
  label: Tag,
  status: HardHat,
  title: Pencil,
  comment: MessageCircle,
} as const;

interface ActivityIconProps {
  name: keyof typeof ICONS;
  timestamp: number;
}

export default function ActivityIcon({ name, timestamp }: ActivityIconProps) {
  const Icon = ICONS[name];
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted border border-border ring-8 ring-background text-muted-foreground">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <ActivityCard timestamp={timestamp} />
      </HoverCardContent>
    </HoverCard>
  );
}
