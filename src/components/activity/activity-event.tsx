interface ActivityEventProps {
  children: React.ReactNode;
}

export default function ActivityEvent({ children }: ActivityEventProps) {
  return <span className="text-sm text-muted-foreground">{children}</span>;
}
