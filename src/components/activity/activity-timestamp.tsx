import { formatDistanceStrict } from "date-fns";

interface ActivityTimestampProps {
  timestamp: number;
}

export default function ActivityTimestamp({
  timestamp,
}: ActivityTimestampProps) {
  return (
    <span className="whitespace-nowrap">
      {formatDistanceStrict(new Date(timestamp), new Date())} ago
    </span>
  );
}
