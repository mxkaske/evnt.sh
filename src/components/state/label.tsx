"use client";

import * as React from "react";
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LABELS } from "@/constants/state";
import { Plus } from "lucide-react";

// TODO: add dialog

interface LabelDropdownMenuProps {
  onChange?: (value: string) => void;
  onClose?: () => void;
}

export default function LabelDropdownMenu({}: LabelDropdownMenuProps) {
  const [newLabel, setNewLabel] = React.useState<string>("");
  const [labels, setLabels] = React.useState<string[]>(LABELS);
  const [values, setValues] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (labels.includes(newLabel)) {
      setValues((prev) => [...prev, newLabel]);
      setNewLabel("");
    }
  }, [newLabel, labels]);

  return (
    <Dialog>
      <DropdownMenu
        onOpenChange={(open) => {
          if (!open) {
            // onClose()
          }
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Labels</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {labels.map((label) => {
            const checked = values.includes(label);
            return (
              <DropdownMenuCheckboxItem
                key={label}
                checked={checked}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setValues((prev) => [...prev, label]);
                  } else {
                    setValues((prev) => prev.filter((l) => l !== label));
                  }
                }}
                onSelect={(event) => {
                  event.preventDefault();
                }}
                className="capitalize"
              >
                {label}
              </DropdownMenuCheckboxItem>
            );
          })}
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
              className="appearance-none"
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>Create Label</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Label</DialogTitle>
          <DialogDescription>
            Missing a label? Create one now!
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="name" className="sr-only">
            Name
          </Label>
          <Input
            id="name"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="w-full"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={newLabel.trim() === ""}
              onClick={() => {
                setLabels((prev) => [...prev, newLabel]);
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
