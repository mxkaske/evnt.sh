/* eslint-disable react/no-unescaped-entities */
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

export default function EmptyState() {
  return (
    <div className="text-center">
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
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Name
                </Label>
                <Input id="title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Input id="status" value="Ready" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create state</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
