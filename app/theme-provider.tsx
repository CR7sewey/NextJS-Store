"use client";
import { type ThemeProviderProps } from "next-themes/dist/types";
import React from "react";
import { ThemeProvider as NextTheme } from "next-themes";

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextTheme {...props}>{children}</NextTheme>;
}

export default ThemeProvider;
