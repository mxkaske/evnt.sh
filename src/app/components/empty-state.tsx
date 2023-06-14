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
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmptyState() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const disabled = value === ""

  const onClick = async () => {
    await fetch("api/v1/upstash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: value,
        status: "Ready",
        labels: [],
      }),
    });
    await fetch("api/v1/tinybird", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "create",
        name: "title",
        value,
      }),
    });
    router.refresh();
  };

  return (
    <div className="text-center p-6 border border-border rounded-lg border-dashed">
      <h3 className="text-sm font-semibold text-foreground">No state</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new state.
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New State
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create state</DialogTitle>
              <DialogDescription>
                Start a new state by entering a title.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" {...{ onClick, disabled }}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
