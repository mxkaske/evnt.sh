"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";

export default function CommentForm() {
  const pathname = usePathname();
  const [value, setValue] = useState("");
  const router = useRouter();
  const disabled = value === "";

  const onClick = async () => {
    const timestamp = Date.now();
    await fetch(`api/v0/tinybird${pathname}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "create",
        name: "comment",
        value,
      }),
    });
    setValue("");
    router.refresh(); // seems to no reset the value..
  };
  return (
    <div className="relative w-full backdrop-blur-[2px]">
      <div className="rounded-lg pb-12 shadow-sm border border-border ring-ring ring-offset-background focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring">
        <Label htmlFor="comment" className="sr-only">
          Add your comment
        </Label>
        <textarea
          id="comment"
          name="comment"
          className="block w-full resize-none border-0 bg-transparent py-2 px-3 placeholder:text-muted-foreground focus:outline-none sm:text-sm sm:leading-6"
          placeholder="Add your comment..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </div>
      <div className="absolute left-0 bottom-0 flex justify-between py-2 px-3">
        <Button onClick={onClick} size="sm" disabled={disabled}>
          Submit
        </Button>
      </div>
    </div>
  );
}
