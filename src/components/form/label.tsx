"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { EVENT_USER } from "@/constants/event";

// Maybe BADGES is better? Not to confuse with the form label aka LabelForm
const LABELS = ["bug", "documentation", "duplicate", "enhancement", "question"];

interface LabelFormProps {
  defaultValues?: string[];
}

// REFACTOR: use state later
export default function LabelForm({ defaultValues }: LabelFormProps) {
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          labels: HTMLInputElement[];
        };
        const added: string[] = [];
        const removed: string[] = [];
        Array.from(target.labels).forEach((label) => {
          if (label.checked && !defaultValues?.includes(label.value)) {
            added.push(label.value);
          }
          if (!label.checked && defaultValues?.includes(label.value)) {
            removed.push(label.value);
          }
        });
        // TODO: how to deal with more labels
        if (added.length > 0) {
          await fetch("api/v1/events", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "add-label",
              "add-label": { data: added[0] },
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
              "remove-label": { data: removed[0] },
              user: EVENT_USER,
            }),
          });
        }
        router.refresh();
      }}
      className="grid w-full max-w-sm items-center gap-1.5"
    >
      <Label>Labels</Label>
      {LABELS.map((label) => {
        const defaultChecked = defaultValues?.includes(label);
        return (
          <div key={label} className="flex items-center space-x-2">
            <Checkbox
              value={label}
              id={label}
              name="labels"
              {...{ defaultChecked }}
            />
            <Label htmlFor={label}>{label}</Label>
          </div>
        );
      })}
      <Button variant="outline">Submit</Button>
    </form>
  );
}
