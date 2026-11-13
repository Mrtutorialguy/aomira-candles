"use client";

import React, { useState } from "react";
import { Product } from "@/lib/schemas";
import { ProductCard } from "./ProductCard";

interface ProductCatalogProps {
  initialProducts: Product[];
}

export function ProductCatalog({ initialProducts }: ProductCatalogProps) {
  const [filter, setFilter] = useState<string>("all");

  const filtered = initialProducts.filter((product) => {
    if (filter === "all") return true;
    if (filter === "soy") return product.waxType.toLowerCase().includes("soy");
    if (filter === "beeswax") return product.waxType.toLowerCase().includes("beeswax");
    if (filter === "coconut") return product.waxType.toLowerCase().includes("coconut");
    return true;
  });

  return (
    <section id="catalog" className="py-16 md:py-24 border-b border-[#382c22]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#c4682b]">
              Artisanal Studio Batch
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#231f1c] mt-1">
              Seasonal Candle Collection
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Blends" },
              { id: "soy", label: "Soy Wax" },
              { id: "beeswax", label: "Pure Beeswax" },
              { id: "coconut", label: "Coconut Apricot" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filter === tab.id
                    ? "bg-[#231f1c] text-white"
                    : "bg-white border border-[#382c22]/10 text-[#6b635c] hover:bg-[#f4eee3]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
