import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";

import "../styles/globals.scss";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Relatorios",
  description: "N3 segurança da informação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(roboto.className, "min-h-screen antialiased")}>
          <main className="max-w-screen h-screen text-foreground bg-background relative ">
            {children}
          </main>
          <Toaster />
      </body>
    </html>
  );
}
