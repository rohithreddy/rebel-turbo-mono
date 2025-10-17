"use client";

import type { PropsWithChildren } from "react";

export function ThemeProvider({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export function ThemeToggle() {
  return null;
}
