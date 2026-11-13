import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cartContext";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { CandlePourLoader } from "@/components/CandlePourLoader";

export const metadata: Metadata = {
  title: "Aomira Candles | Botanical Wax & Artisanal Scents",
  description:
    "Handcrafted small-batch botanical candles made with 100% soy and coconut waxes, FSC crackling wooden wicks, and phthalate-free fragrance architecture.",
  keywords: [
    "artisan candles",
    "botanical wax",
    "wooden wick candle",
    "soy candle",
    "clean fragrance",
    "amber santal",
    "Aomira candles",
  ],
  authors: [{ name: "Aomira Candle Studio" }],
  openGraph: {
    title: "Aomira Candles | Botanical Wax & Artisanal Scents",
    description: "Slow-crafted botanical candles poured with crackling timber wicks.",
    url: "https://aomiracandles.vercel.app",
    siteName: "Aomira Candles",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans selection:bg-[#c4682b]/20 selection:text-[#231f1c]">
        <CartProvider>
          <CandlePourLoader />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
