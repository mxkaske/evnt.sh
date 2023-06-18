import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import BG from "@/components/bg";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // metadataBase: new URL("https://evnt.sh"),
  title: "evnt.sh",
  description: "Event sourcing made easy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: "system" }}>
      {/* FIXME: remove on prod */}
      {process.env.NODE_ENV === "development" ? (
        <script async src="https://cdn.tailwindcss.com"></script>
      ) : undefined}
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
