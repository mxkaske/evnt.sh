"use client";

import { useRouter } from "next/navigation";

export default function LabelForm() {
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          label: { value: string };
        };
        await fetch("api/v1/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "add-label",
            data: target.label.value,
            user: "Maximilian Kaske",
          }),
        });
        router.refresh();
        // e.currentTarget.reset();
      }}
    >
      <label htmlFor="label" className="text-gray-600">
        Create event by adding label
      </label>
      <input id="label" name="label" className="border" />
      <button>Submit</button>
    </form>
  );
}
