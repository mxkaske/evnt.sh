"use client";

import { useRouter } from "next/navigation";

interface TitleFormProps {
  defaultValue?: string;
}

export default function TitleForm({ defaultValue }: TitleFormProps) {
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          title: { value: string };
        };
        await fetch("api/v1/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "update-title",
            data: target.title.value,
            user: "Maximilian Kaske",
          }),
        });
        router.refresh();
        // e.currentTarget.reset();
      }}
    >
      <label htmlFor="title" className="text-gray-600">
        Edit title
      </label>
      <input id="title" name="title" className="border" {...{ defaultValue }} />
      <button>Submit</button>
    </form>
  );
}
