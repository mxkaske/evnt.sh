"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

const STATUS = ["Ready", "In progress", "Done"];

interface StatusFormProps {
  defaultValue?: string;
}

export default function StatusForm({ defaultValue }: StatusFormProps) {
  const pathname = usePathname();
  const [value, setValue] = useState(defaultValue);
  const disabled = value === defaultValue;
  const router = useRouter();
  console.log({ defaultValue });

  useEffect(() => {
    const handleChange = async () => {
      await fetch(`api/v0/tinybird${pathname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: defaultValue ? "update" : "create",
          name: "status",
          value,
        }),
      });
      router.refresh();
    };

    if (!disabled) {
      handleChange();
    }
  }, [disabled, router, value, pathname, defaultValue]);

  return (
    <div className="grid gap-1.5">
      <Label htmlFor="status">Status</Label>
      <Select name="status" onValueChange={setValue} defaultValue={value}>
        <SelectTrigger id="status" className="backdrop-blur-[2px]">
          <SelectValue placeholder="Select status" />
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
