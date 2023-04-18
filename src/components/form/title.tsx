"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { EVENT_USER } from "@/constants/event";

interface TitleFormProps {
  defaultValue?: string;
}

export default function TitleForm({ defaultValue }: TitleFormProps) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  const onClick = async () => {
    await fetch("api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "update-title",
        "update-title": { data: value },
        user: EVENT_USER,
      }),
    });
    router.refresh();
  };
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="title">Edit title</Label>
      <Input
        id="title"
        name="title"
        onChange={(e) => setValue(e.target.value)}
        defaultValue={value}
      />
      <Button variant="outline" onClick={onClick}>
        Submit
      </Button>
    </div>
  );
}
