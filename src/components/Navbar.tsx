"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { ShoppingBag, Flame } from "lucide-react";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-[#382c22]/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-full bg-[#382c22] text-[#fdfbf7] flex items-center justify-center transition-transform group-hover:scale-105">
              <Flame className="w-4 h-4 text-[#d97736]" />
            </span>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.2em] text-lg font-bold text-[#231f1c] uppercase">
                Aomira
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#6b635c] uppercase -mt-1">
                Candle Studio
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-[#4a423a]">
            <a
              href="#catalog"
              className="hover:text-[#c4682b] transition-colors"
            >
              Collection
            </a>
            <a
              href="#fragrance"
              className="hover:text-[#c4682b] transition-colors"
            >
              Scent Pyramid
            </a>
            <a
              href="#craft"
              className="hover:text-[#c4682b] transition-colors"
            >
              Our Craft
            </a>
            <a
              href="#contact"
              className="hover:text-[#c4682b] transition-colors"
            >
              Custom Inquiries
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open shopping cart"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#382c22]/15 bg-white text-[#231f1c] hover:bg-[#f4eee3] transition-colors text-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#382c22]" />
            <span className="hidden sm:inline font-medium">Cart</span>
            {totalItems > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#c4682b] text-white text-xs flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
