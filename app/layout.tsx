import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbat from "@/components/navbar/Navbat";
import NavSearch from "@/components/navbar/NavSearch";
import CartButton from "@/components/navbar/CartButton";
import Containers from "@/components/global/Containers";

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
    <html lang="en">
      <body className={inter.className}>
        <Navbat />
        <Containers className="py-20">{children}</Containers>
      </body>
    </html>
  );
}
