"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

interface TitleFormProps {
  defaultValue?: string;
}

export default function TitleForm({ defaultValue }: TitleFormProps) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const disabled = value === defaultValue;

  const onClick = async () => {
    if (!disabled) {
      await fetch("api/v1/tinybird", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "update",
          name: "title",
          value,
        }),
      });
      router.refresh();
    }
  };

  return (
    <div className="grid gap-1.5">
      <Label htmlFor="title">Title</Label>
      <div className="flex gap-1.5">
        <Input
          id="title"
          name="title"
          onChange={(e) => setValue(e.target.value)}
          defaultValue={value}
          className="backdrop-blur-[2px]"
        />
        <Button
          variant="outline"
          className="backdrop-blur-[2px]"
          onClick={onClick}
          // disabled={disabled} avoid disabled state
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
