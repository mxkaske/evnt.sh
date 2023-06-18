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
import { LoadingAnimation } from "@/components/waitlist/loading-animation";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function EmptyState() {
  const pathname = usePathname();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const disabled = value === "" || loading;

  const onClick = async () => {
    setLoading(true);
    const now = Date.now();
    const appendix = pathname !== "/" ? pathname : `/${now}`;
    await fetch(`api/v0/tinybird${appendix}`, {
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
    router.push(`${appendix}`);
  };

  return (
    <div className="text-center p-6 border border-border rounded-lg border-dashed backdrop-blur-[2px]">
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
              <Button type="submit" {...{ onClick, disabled }}>
                {loading ? <LoadingAnimation /> : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
