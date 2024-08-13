"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>{children}</StoreProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
