"use client"

import { Button } from "@/components/ui/button"
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { useEffect, useState } from "react";
import { LoadingAnimation } from "./loading-animation";


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

  return <Button type="submit" disabled={pending} className="w-20 disabled:opacity-100">{pending ? <LoadingAnimation /> : "Join"}</Button>

}