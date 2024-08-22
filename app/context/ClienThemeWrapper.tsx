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
    <div data-theme={theme} className="bg-base-200">
      {children}
    </div>
  );
}
