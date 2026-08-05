import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prisma Hogar | Ropa de cama exquisita",
    template: "%s | Prisma Hogar",
  },
  description:
    "Tienda online de sábanas, cobijas, duvets, edredones, protectores y almohadas. Compra fácil y agrega al carrito.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${figtree.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="texture-grain flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
