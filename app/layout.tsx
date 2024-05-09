import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sastoREDDIT",
  description: "reddit chalau moj garau",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="winter" lang="en">
      <body className={inter.className}>
        <Navbar />
        <Toaster position="top-center" />
        <main className="bg-base-100 text-black">{children}</main>
      </body>
    </html>
  );
}
