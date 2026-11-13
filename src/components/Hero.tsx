import React from "react";
import Image from "next/image";
import { Sparkles, Compass, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#382c22]/10 overflow-hidden bg-grain">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4eee3] border border-[#382c22]/10 text-xs text-[#6b635c]">
              <span className="w-2 h-2 rounded-full bg-[#c4682b]" />
              Handcrafted in small batches of 24 vessels
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#231f1c] font-normal tracking-tight leading-[1.15]">
              Botanical wax candles poured for quiet evenings.
            </h1>

            <p className="text-base sm:text-lg text-[#5a524a] max-w-xl leading-relaxed">
              We blend pure coconut and soy wax with phthalate-free fragrance oils
              and untreated FSC-certified crackling wooden wicks. Clean burning, slow melting,
              and crafted without synthetic dyes or petroleum paraffin.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#231f1c] text-[#fdfbf7] text-sm font-medium hover:bg-[#3d3630] transition-colors shadow-sm"
              >
                Explore The Collection
              </a>
              <a
                href="#craft"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-[#382c22]/20 bg-white text-[#231f1c] text-sm font-medium hover:bg-[#f4eee3] transition-colors"
              >
                Our Wax &amp; Wicks
              </a>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#382c22]/10 text-xs text-[#6b635c]">
              <div>
                <p className="font-semibold text-sm text-[#231f1c]">50 to 60 Hours</p>
                <p>Even, slow burn time</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-[#231f1c]">100% Botanical</p>
                <p>Zero petroleum paraffin</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-[#231f1c]">FSC Wood Wicks</p>
                <p>Gentle crackle as it burns</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#f7f2ea] border border-[#382c22]/10 flame-glow">
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#faf6ef] flex items-center justify-center border border-[#382c22]/10">
                <Image
                  src="/candles/amber-santal.svg"
                  alt="Aomira Amber Santal Handcrafted Candle"
                  width={340}
                  height={420}
                  priority
                  className="object-contain p-4"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#5a524a]">
                <span className="font-serif font-bold text-sm text-[#231f1c]">
                  Amber Santal No. 01
                </span>
                <span>$36 USD / 9 oz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
