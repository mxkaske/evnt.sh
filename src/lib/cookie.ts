import { cookies } from "next/headers";

export function setCookie(name: string, value: string, days = 1) {
  if (document) {
    let expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${expires}; path=/`
  }
}

export function getCookieClient(name: string) {
  if (document) {
    const regex = /id=(\d+)/;
    const match = document.cookie.match(regex);
    if (match) {
      return match[1];
    }
    return null;
  }
}

export function getCookieServer(name: string) {

}