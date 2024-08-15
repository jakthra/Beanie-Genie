import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beanie Genie",
  description: "Coffee transactions",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark" accentColor="brown" grayColor="sand" radius="large" scaling="95%">
          <Providers>
            {children}
          </Providers>
        </Theme>
      </body>
    </html>
  );
}
