"use client";

import React, { useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";

export default function ClientThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="h-screen" data-theme={theme}>
      {children}
    </div>
  );
}
