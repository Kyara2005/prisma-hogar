import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
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
    <html lang="es" className={`${raleway.variable} h-full antialiased`}>
      <body className="texture-grain flex min-h-full flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
