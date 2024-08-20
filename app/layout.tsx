import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";
import ClientThemeWrapper from "@/app/context/ClienThemeWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn JS App",
  description: "Learn JavaScript with questions and coding challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <ThemeProvider>
          <ClientThemeWrapper>{children}</ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
