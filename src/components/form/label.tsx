"use client";

import { useRouter } from "next/navigation";

const LABELS = ["bug", "documentation", "duplicate", "enhancement", "question"];

interface LabelFormProps {
  defaultValues?: string[];
}

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
              data: added[0],
              user: "Maximilian Kaske",
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
              data: removed[0],
              user: "Maximilian Kaske",
            }),
          });
        }
        router.refresh();
        // e.currentTarget.reset();
      }}
      className="flex flex-col items-start"
    >
      {LABELS.map((label) => {
        const defaultChecked = defaultValues?.includes(label);
        return (
          <label key={label} htmlFor={label} className="text-gray-600">
            <input
              type="checkbox"
              value={label}
              id={label}
              name="labels"
              {...{ defaultChecked }}
            />
            {label}
          </label>
        );
      })}
      <button>Submit</button>
    </form>
  );
}
