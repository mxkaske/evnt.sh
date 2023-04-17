"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { EVENT_USER } from "@/constants/event";
import { Textarea } from "../ui/textarea";

// REMINDER: no default value
export default function CommentForm() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const onClick = async () => {
    await fetch("api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "add-comment",
        data: value,
        user: EVENT_USER,
      }),
    });
    router.refresh(); // seems to no reset the value..
    setValue("");
  };
  return (
    <div className="grid w-full items-center gap-1.5 rounded-md p-3 bg-muted border border-border">
      <Label htmlFor="comment">Add comment</Label>
      <Textarea
        id="comment"
        name="comment"
        className="bg-background"
        onChange={(e) => setValue(e.target.value)}
        defaultValue={value}
      />
      <div>
        <Button onClick={onClick} size="sm">
          Submit
        </Button>
      </div>
    </div>
  );
}
