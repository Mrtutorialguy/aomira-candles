import React from "react";
import { Flame } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1c1815] text-[#d6cec7] py-14 border-t border-[#382c22]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#382c22] text-[#fdfbf7] flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 text-[#d97736]" />
              </span>
              <span className="font-serif tracking-[0.2em] text-base font-bold text-white uppercase">
                Aomira
              </span>
            </div>
            <p className="text-xs text-[#a89f97] max-w-sm leading-relaxed">
              Botanical candle studio dedicated to slow living. Hand-poured using 100% plant-based waxes, crackling timber wicks, and clean fragrance architecture.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-semibold text-white tracking-wider uppercase text-[11px]">
              Studio Care Advice
            </p>
            <p className="text-[#a89f97] leading-relaxed">
              Trim timber wicks to 1/4 inch before each burn. Allow full melt pool to reach glassware edges on first burn to prevent tunneling.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-semibold text-white tracking-wider uppercase text-[11px]">
              Location &amp; Inquiries
            </p>
            <p className="text-[#a89f97]">Studio: Portland, Oregon</p>
            <p className="text-[#a89f97]">Email: studio@aomiracandles.com</p>
            <p className="text-[#a89f97]">Wholesale: orders@aomiracandles.com</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7d746d] gap-3">
          <p>&copy; {new Date().getFullYear()} Aomira Candles Studio. All rights reserved.</p>
          <p>Hand-poured with pure botanicals and crackling wooden wicks.</p>
        </div>
      </div>
    </footer>
  );
}
