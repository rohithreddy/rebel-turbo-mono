import type { Metadata } from "next";
import type React from "react";

import "@/app/globals.css";
import { Inter } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@barebel/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Be A Rebel - Social Cause Crowdfunding Platform",
  description:
    "Fund impactful social causes and collaborate on resourceful solutions that maximize impact with minimal resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCReactProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
