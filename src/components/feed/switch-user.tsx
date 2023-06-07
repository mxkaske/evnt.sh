"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { USERS } from "@/constants/users"
import { useEffect, useState } from "react"

function fallbackName(name: string) {
  return name.substring(0, 2).toUpperCase()
}

function setCookie(id: number) {
  if (document) {
    let expires = new Date();
    expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)); // expires in one day
    document.cookie = `id=${id}; expires=${expires}; path=/`
  }
}

function getCookieId() {
  if (document) {
    const regex = /id=(\d+)/;
    const match = document.cookie.match(regex);
    if (match) {
      return match[1];
    }
    return null;
  }
  return null;
}

export default function SwitchUser() {
  const [activeUser, setActiveUser] = useState(USERS[1]);

  useEffect(() => {
    const id = getCookieId();
    console.log(id)
    setActiveUser(USERS.find((user) => user.id === Number(id)) || USERS[1])
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activeUser.avatar} alt={activeUser.username} />
            <AvatarFallback>{fallbackName(activeUser.username)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">@{activeUser.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              Select a different user
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {USERS.map((user) => {
            return (
              <DropdownMenuItem
                key={user.id}
                onSelect={() => {
                  setActiveUser(user);
                  setCookie(user.id);
                }}
              >
                <Avatar className="mr-2 h-4 w-4">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  {/* TODO: replace username with first 2 chars after @ */}
                  <AvatarFallback>{fallbackName(user.username)}</AvatarFallback>
                </Avatar>
                <span>{user.username}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}