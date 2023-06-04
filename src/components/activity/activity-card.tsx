"use client";

import { State } from "@/types/states";
import { Badge } from "../ui/badge";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";

interface ActivityCarProps {
  timestamp: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ActivityCard({ timestamp }: ActivityCarProps) {
  const { data, error, isLoading } = useSWR<State>(
    `/api/v1/states?timestamp=${timestamp}`, // REMINDER: currently, no timestamp
    fetcher
  );

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
        <div className="flex space-x-2">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <p className="text-destructive-foreground">Something went wrong.</p>;
  }

  return (
    <div className="space-y-2 text-sm">
      <p>
        <span className="font-light text-muted-foreground">Title</span>{" "}
        <span className="font-medium">{data.title}</span>
      </p>
      <p>
        <span className="font-light text-muted-foreground">Status</span>{" "}
        {data.status ? (
          <span className="font-medium">{data.status}</span>
        ) : (
          <span className="text-muted-foreground opacity-50">undefined</span>
        )}
      </p>
      <p>
        <span className="font-light text-muted-foreground">Labels</span>{" "}
        {data.labels.length > 0 ? (
          <span>
            {data.labels.map((label) => (
              <Badge key={label} variant="outline" className="mr-1 mb-1">
                {label}
              </Badge>
            ))}
          </span>
        ) : (
          <span className="text-muted-foreground opacity-50">undefined</span>
        )}
      </p>
    </div>
  );
}
