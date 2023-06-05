"use client"

import { Button } from "@/components/ui/button"
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { useEffect, useState } from "react";


export function WaitlistSubmitButton({ close }: {
  close: () => void;
}) {
  const [mount, setMount] = useState(false);
  const { pending } = useFormStatus();

  useEffect(() => {
    setMount(true);
  }, [])

  useEffect(() => {
    if (mount && !pending) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending])

  const text = pending ? "Subscribing..." : "Subscribe"
  return <Button type="submit" disabled={pending}>{text}</Button>

}