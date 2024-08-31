import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbat from "@/components/navbar/Navbat";
import { ClerkProvider } from "@clerk/nextjs";
import Containers from "@/components/global/Containers";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Store",
  description: "GStore built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            <Navbat />
            <Containers className="py-20">{children}</Containers>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
