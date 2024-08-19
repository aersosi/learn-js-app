import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <html lang="de" data-theme="light">
        <body className={inter.className}>{children}</body>
      </html>
  );
}
