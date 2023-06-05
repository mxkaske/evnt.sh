"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

const STATUS = ["Ready", "In progress", "Done"];

interface StatusFormProps {
  defaultValue?: string;
}

export default function StatusForm({ defaultValue }: StatusFormProps) {
  const [value, setValue] = useState(defaultValue);
  const disabled = value === defaultValue;
  const router = useRouter();

  const handleChange = async () => {
    await fetch("api/v1/states", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "status-update",
        data: value
      }),
    });
    router.refresh();
  };

  // TODO:!!!!
  const onOpenChange = (value: boolean) => {
    if (!value && !disabled) {
      handleChange()
    }
  }

  return (
    <div className="grid gap-1.5">
      <Select onOpenChange={onOpenChange} name="status" onValueChange={setValue} defaultValue={value}>
        <SelectTrigger id="status">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

    </div>
  );
}
