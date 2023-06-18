"use server";

import { redis } from "@/lib/upstash";

export async function submitEmail(data: FormData) {
  const email = data.get("email");
  if (email) {
    // hacky but ok
    await redis.zadd("waitlist", {
      score: new Date().getTime(),
      member: email,
    });
    // await wait(3000);
    // await fetch(`https://api.highstorm.app/v0/events/evnt.waitlist`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.HIGHSTORM_TOKEN}`,
    //   },
    //   body: JSON.stringify({
    //     event: "Waitlist subscription",
    //     content: `New user interested: ${email}`,
    //     metadata: { email },
    //   }),
    // });
  }
}

const wait = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};
