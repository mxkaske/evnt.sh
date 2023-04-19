"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DeleteButton() {
  const router = useRouter();

  const onClick = async () => {
    await fetch(`/api/v1/events`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <Button variant="destructive" onClick={onClick} size="sm">
      Reset
    </Button>
  );
}
