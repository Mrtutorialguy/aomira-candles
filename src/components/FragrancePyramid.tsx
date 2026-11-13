import React from "react";
import { Sparkles, Wind, Flame } from "lucide-react";

export function FragrancePyramid() {
  return (
    <section id="fragrance" className="py-16 md:py-24 border-b border-[#382c22]/10 bg-[#f9f6f0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#c4682b]">
            Olfactory Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#231f1c]">
            The Anatomy of a Slow Burn
          </h2>
          <p className="text-sm sm:text-base text-[#6b635c] leading-relaxed">
            Fine candles reveal their profile in three distinct stages as the wax pool warms and releases botanical essential oils into your room.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#382c22]/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-[#f4eee3] flex items-center justify-center text-[#c4682b]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#c4682b]">
                Stage 1 : 0 to 15 Minutes
              </span>
              <h3 className="font-serif text-lg font-bold text-[#231f1c]">
                Top Notes
              </h3>
            </div>
            <p className="text-xs text-[#5a524a] leading-relaxed">
              The first impression upon lighting. Volatile citrus and herb oils like Italian bergamot, fresh cardamom, and crushed fig leaf that greet you right as the flame catches the wooden wick.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#382c22]/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-[#f4eee3] flex items-center justify-center text-[#b38528]">
              <Wind className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#b38528]">
                Stage 2 : 15 to 45 Minutes
              </span>
              <h3 className="font-serif text-lg font-bold text-[#231f1c]">
                Heart Notes
              </h3>
            </div>
            <p className="text-xs text-[#5a524a] leading-relaxed">
              The core identity of the fragrance. As the wax pool liquefies edge to edge, rounded botanicals like wild honeycomb, violet, lavender sprigs, and cypress needles blossom into the space.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#382c22]/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-[#f4eee3] flex items-center justify-center text-[#382c22]">
              <Flame className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#382c22]">
                Stage 3 : 45 Minutes to Finish
              </span>
              <h3 className="font-serif text-lg font-bold text-[#231f1c]">
                Base Notes
              </h3>
            </div>
            <p className="text-xs text-[#5a524a] leading-relaxed">
              The lingering warmth that grounds the room for hours. Heavy, slow-evaporating molecules including Australian sandalwood, Haitian root vetiver, golden amber, and smoked birchwood.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
