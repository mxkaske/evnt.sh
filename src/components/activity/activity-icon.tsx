import { HardHat, MessageCircle, Pencil, Tag, User } from "lucide-react";

const ICONS = {
  user: User,
  label: Tag,
  status: HardHat,
  title: Pencil,
  comment: MessageCircle,
} as const;

interface ActivityIconProps {
  name: keyof typeof ICONS;
}

export default function ActivityIcon({ name }: ActivityIconProps) {
  const Icon = ICONS[name];
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border ring-8 ring-background text-muted-foreground">
      <Icon className="h-4 w-4" aria-hidden="true" />
    </div>
  );
}
