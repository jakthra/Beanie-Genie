import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Providers from "./providers";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "./components/Navbar";
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
        <Theme appearance="dark" accentColor="brown" panelBackground="solid" grayColor="slate" radius="large" scaling="95%">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <Navbar />
                <main className="lg:flex lg:flex-col lg:items-center lg:justify-between lg:p-24">
                  {children}
                </main>

              </div>
            </Providers>
          </ThemeProvider>
        </Theme>
      </body>
    </html>
  );
}
