"use client";

import { useRouter } from "next/navigation";

interface StatusFormProps {
  defaultValue?: string;
}

export default function StatusForm({ defaultValue }: StatusFormProps) {
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          status: { value: string };
        };
        await fetch("api/v1/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "update-status",
            data: target.status.value,
            user: "Maximilian Kaske",
          }),
        });
        router.refresh();
        // e.currentTarget.reset();
      }}
    >
      <label htmlFor="status" className="text-gray-600">
        Status
      </label>
      <select
        id="status"
        name="status"
        className="border appearance-none"
        {...{ defaultValue }}
      >
        <option value="ready">ready</option>
        <option value="in progress">in progress</option>
        <option value="done">done</option>
      </select>
      <button>Submit</button>
    </form>
  );
}
