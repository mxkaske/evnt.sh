"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { LABELS } from "@/constants/state";
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge";

interface LabelFormProps {
  defaultValues?: string[];
}

export default function LabelForm({ defaultValues = [] }: LabelFormProps) {
  const [open, setOpen] = React.useState(false)
  const [values, setValues] = React.useState(defaultValues)
  const router = useRouter();
  //   const disabled =
  //     JSON.stringify(values.sort()) === JSON.stringify(defaultValues.sort());

  const handleChange = async () => {
    const added = values.filter((label) => !defaultValues?.includes(label));
    const removed = defaultValues?.filter((label) => !values?.includes(label));
    // FIXME: currently always added because defaultValues seem to be falsy
    if (added.length > 0) {
      await fetch("api/v1/states", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "labels-create",
          data: added
        }),
      });
    }
    if (removed.length > 0) {
      await fetch("api/v1/states", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "labels-delete",
          data: removed
        }),
      });
    }
    router.refresh();
  }

  const onOpenChange = (value: boolean) => {
    // && !disabled
    if (!value) {
      handleChange()
    }
    setOpen(value)
  }


  return (
    <div className="grid gap-1.5">
      <Label onClick={() => setOpen(true)}>Labels</Label>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between line-clamp-1"
          >
            <span className="truncate">{values.length > 0
              ? values.join(", ")
              : "Select label..."}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search label..." />
            <CommandEmpty>No label found.</CommandEmpty>
            <CommandGroup>
              {LABELS.map((label) => (
                <CommandItem
                  key={label}
                  onSelect={(currentValue) => {
                    setValues(values.includes(currentValue) ? values.filter(value => currentValue !== value) : [...values, currentValue])
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      values.includes(label) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex gap-1 flex-wrap">{values.map(value => {
        return <Badge key={value}>{value}</Badge>
      })}</div>
    </div>
  )
}
