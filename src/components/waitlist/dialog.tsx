"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WaitlistSubmitButton } from "./submit-button";
import { WaitlistForm } from "./form";
import { useState } from "react";

export function WaitlistDialog() {
  const [open, setOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  if (subscribed) {
    return (
      <Button variant="outline" disabled>
        Subscribed!
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Join waitlist</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <WaitlistForm>
          <DialogHeader>
            <DialogTitle>Join waitlist</DialogTitle>
            <DialogDescription>
              Sign up to the waiting list and stay updated.
              <br />
              <span className="text-muted-foreground text-xs">
                Your email will be stored without getting a confirmation email.
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                required
                id="email"
                name="email"
                placeholder="me@domain.com"
                type="email"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <WaitlistSubmitButton
              close={() => {
                setOpen(false);
                setSubscribed(true);
              }}
            />
          </DialogFooter>
        </WaitlistForm>
      </DialogContent>
    </Dialog>
  );
}
