import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

import Navbar from "@/components/Navbar";
import CreatePost from "@/components/CreatePost";

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
  const userID = Cookies.get("userId");

  return (
    <html data-theme="winter" lang="en">
      <body className={inter.className}>
        <Navbar />
        <Toaster position="top-center" />
        <main className="bg-base-100 text-black">{children}</main>
        {userID && (
          <div className="fixed bottom-5 right-5">
            <CreatePost />
          </div>
        )}
      </body>
    </html>
  );
}
