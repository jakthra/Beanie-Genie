import type { Metadata } from "next";
import { Inter, Sedan, Taviraj, Noto_Serif, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Providers from "./providers";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "./components/Navbar";
const usedFont = Noto_Sans({
  subsets: ["latin"], weight: "400",
  display: 'swap',
  variable: '--font-sedan',
});



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
      <body className={usedFont.className}>
        <Theme appearance="dark" accentColor="brown" panelBackground="solid" grayColor="slate" radius="large" scaling="95%">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <div className="flex min-h-screen w-full flex-col bg-muted/10">
                <Navbar />
                <main className="sm:pl-24">
                  {children}
                </main>

              </div>
              <ThemePanel />
            </Providers>
          </ThemeProvider>
        </Theme>
      </body>
    </html>
  );
}
