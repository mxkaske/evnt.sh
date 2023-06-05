import { submitEmail } from "./actions"

export function WaitlistForm({ children }: { children: React.ReactNode }) {
  return (
    <form action={submitEmail}>
      {children}
    </form>
  )
}