"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { EVENT_USER } from "@/constants/event";
import { useState } from "react";
import { LABELS } from "@/constants/state";

interface LabelFormProps {
  defaultValues?: string[];
}

// REFACTOR: use state later
export default function LabelForm({ defaultValues = [] }: LabelFormProps) {
  const [values, setValues] = useState(defaultValues);
  const router = useRouter();
  const disabled =
    JSON.stringify(values.sort()) === JSON.stringify(defaultValues.sort());

  const onClick = async () => {
    const added = values.filter((label) => !defaultValues?.includes(label));
    const removed = defaultValues?.filter((label) => !values?.includes(label));
    // TODO: how to deal with more labels
    if (added.length > 0) {
      await fetch("api/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "add-label",
          "add-label": { data: added },
          user: EVENT_USER,
        }),
      });
    }
    if (removed.length > 0) {
      await fetch("api/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "remove-label",
          "remove-label": { data: removed },
          user: EVENT_USER,
        }),
      });
    }
    router.refresh();
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>Labels</Label>
      {LABELS.map((label) => {
        const defaultChecked = defaultValues?.includes(label);
        return (
          <div key={label} className="flex items-center space-x-2">
            <Checkbox
              value={label}
              id={label}
              name="labels"
              onCheckedChange={(checked) => {
                if (checked) {
                  setValues((prev) => [...prev, label]);
                } else {
                  setValues((prev) => prev.filter((l) => l !== label));
                }
              }}
              {...{ defaultChecked }}
            />
            <Label htmlFor={label}>{label}</Label>
          </div>
        );
      })}
      <Button variant="outline" onClick={onClick} disabled={disabled}>
        Submit
      </Button>
    </div>
  );
}
