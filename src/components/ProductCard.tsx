"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/schemas";
import { useCart } from "@/lib/cartContext";
import { Plus, Check, Clock, Feather } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="group flex flex-col bg-white rounded-xl border border-[#382c22]/10 overflow-hidden hover:border-[#382c22]/25 transition-colors">
      <div className="relative aspect-square bg-[#faf7f2] border-b border-[#382c22]/10 p-6 flex items-center justify-center overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={280}
          height={320}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-[#382c22]/10 text-[11px] font-medium text-[#5a524a]">
          <Clock className="w-3 h-3 text-[#c4682b]" />
          <span>{product.burnTimeHours} hr burn</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-[#231f1c]">
              {product.name}
            </h3>
            <span className="text-base font-semibold text-[#231f1c]">
              ${product.price}
            </span>
          </div>
          <p className="text-xs text-[#6b635c] line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-[#382c22]/10 text-xs">
          <div className="flex items-center gap-1.5 text-[#5a524a]">
            <Feather className="w-3.5 h-3.5 text-[#c4682b]" />
            <span className="font-medium text-[#231f1c]">Wax:</span>
            <span className="truncate">{product.waxType}</span>
          </div>

          <div className="bg-[#f9f6f0] p-2.5 rounded-lg space-y-1 text-[11px]">
            <div className="flex items-baseline gap-1">
              <span className="text-[#8c7d73] font-medium w-11 shrink-0">Top:</span>
              <span className="text-[#3d3630] truncate">{product.notes.top.join(", ")}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[#8c7d73] font-medium w-11 shrink-0">Heart:</span>
              <span className="text-[#3d3630] truncate">{product.notes.heart.join(", ")}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[#8c7d73] font-medium w-11 shrink-0">Base:</span>
              <span className="text-[#3d3630] truncate">{product.notes.base.join(", ")}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
            added
              ? "bg-[#485343] text-white"
              : "bg-[#231f1c] text-white hover:bg-[#3d3630]"
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
