import React from "react";
import { ShieldCheck, Leaf, Recycle, Flame } from "lucide-react";

export function BrandEthos() {
  return (
    <section id="craft" className="py-16 md:py-24 border-b border-[#382c22]/10 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#c4682b]">
              Ethical Formulation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#231f1c] leading-tight">
              Poured with intention. Free from compromise.
            </h2>
            <p className="text-sm text-[#5a524a] leading-relaxed">
              Every Aomira candle is blended and hand-poured in our studio using renewable plant waxes and natural fragrance oils. We never cut our wax with petroleum paraffin or chemical stabilizers.
            </p>
            <div className="pt-2">
              <div className="p-4 rounded-xl bg-[#f9f6f0] border border-[#382c22]/10 text-xs text-[#5a524a] space-y-1">
                <p className="font-semibold text-[#231f1c]">Batch Transparency</p>
                <p>
                  Each candle base bears a handwritten batch stamp and master chandler initials for full traceability from melt to wick setting.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-[#382c22]/10 bg-[#fdfbf7] space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#f4eee3] flex items-center justify-center text-[#c4682b]">
                <Leaf className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#231f1c]">
                Renewable Botanical Wax
              </h3>
              <p className="text-xs text-[#6b635c] leading-relaxed">
                Made with 100% Midwestern soy, virgin coconut wax, and sustainably collected beeswax. Burns cleanly without soot or black residue on walls.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#382c22]/10 bg-[#fdfbf7] space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#f4eee3] flex items-center justify-center text-[#c4682b]">
                <Flame className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#231f1c]">
                FSC Certified Wood Wicks
              </h3>
              <p className="text-xs text-[#6b635c] leading-relaxed">
                Untreated natural timber wicks sourced from FSC-managed American forests. Engineered to yield a wide melt pool and gentle fireplace crackle.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#382c22]/10 bg-[#fdfbf7] space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#f4eee3] flex items-center justify-center text-[#c4682b]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#231f1c]">
                Non-Toxic Fragrances
              </h3>
              <p className="text-xs text-[#6b635c] leading-relaxed">
                Every fragrance oil is 100% phthalate-free, paraben-free, and Proposition 65 compliant. Safe to burn around pets and sensitive households.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#382c22]/10 bg-[#fdfbf7] space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#f4eee3] flex items-center justify-center text-[#c4682b]">
                <Recycle className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#231f1c]">
                Reusable Vessels
              </h3>
              <p className="text-xs text-[#6b635c] leading-relaxed">
                Heavy amber tumblers and matte stoneware crocks designed for a second life as planter pots, pencil cups, or desk organizers once washed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
