"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cartContext";
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    freeShippingThreshold,
    shippingFee,
    finalTotal,
  } = useCart();

  const [step, setStep] = useState<"cart" | "checkout" | "confirmed">("cart");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const [shippingData, setShippingData] = useState({
    customerName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
  });

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isCartOpen) return;

    // Focus close button on open
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingDiff = freeShippingThreshold - subtotal;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        customerName: shippingData.customerName,
        email: shippingData.email,
        shippingAddress: {
          street: shippingData.street,
          city: shippingData.city,
          state: shippingData.state,
          postalCode: shippingData.postalCode,
          country: shippingData.country,
        },
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Order submission failed. Please verify shipping details.");
        setIsSubmitting(false);
        return;
      }

      setCompletedOrder(data.order);
      clearCart();
      setStep("confirmed");
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeDrawer = () => {
    setIsCartOpen(false);
    if (step === "confirmed") {
      setStep("cart");
      setCompletedOrder(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Basket"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-md bg-[#fdfbf7] h-full shadow-2xl flex flex-col z-10 border-l border-[#382c22]/15"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#382c22]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-lg font-bold text-[#231f1c]">
              {step === "cart" && "Shopping Basket"}
              {step === "checkout" && "Dispatch Details"}
              {step === "confirmed" && "Order Confirmation"}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDrawer}
            className="p-1.5 rounded-full hover:bg-[#f4eee3] text-[#5a524a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#c4682b]"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        {step === "cart" && items.length > 0 && (
          <div className="px-5 py-3 bg-[#f7f2ea] border-b border-[#382c22]/10 text-xs text-[#5a524a]">
            {freeShippingDiff > 0 ? (
              <p>
                Add <span className="font-semibold text-[#c4682b]">${freeShippingDiff}</span> more for free studio shipping.
              </p>
            ) : (
              <p className="font-medium text-[#485343] flex items-center gap-1">
                <span>Free studio shipping unlocked for your order.</span>
              </p>
            )}
            <div className="w-full bg-[#e6ded3] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#c4682b] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {step === "cart" && (
            <>
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <p className="text-sm text-[#6b635c]">Your basket is currently empty.</p>
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="px-5 py-2 rounded-full bg-[#231f1c] text-white text-xs font-medium hover:bg-[#3d3630] transition-colors"
                  >
                    Browse Candles
                  </button>
                </div>
              ) : (
                <div className="space-y-3 divide-y divide-[#382c22]/10">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                      <div className="relative w-16 h-16 rounded-lg bg-white border border-[#382c22]/10 shrink-0 overflow-hidden flex items-center justify-center p-1">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-[#231f1c] truncate">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-[#6b635c]">
                          ${product.price} each · {product.weightOz} oz
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="inline-flex items-center border border-[#382c22]/15 rounded-md bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1 hover:bg-[#f4eee3] text-[#5a524a]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-[#231f1c]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-1 hover:bg-[#f4eee3] text-[#5a524a]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            className="p-1 text-[#8c7d73] hover:text-red-700 transition-colors ml-auto"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === "checkout" && (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#231f1c]" htmlFor="cName">
                  Full Name
                </label>
                <input
                  id="cName"
                  type="text"
                  required
                  value={shippingData.customerName}
                  onChange={(e) => setShippingData({ ...shippingData, customerName: e.target.value })}
                  placeholder="Eleanor Vance"
                  className="w-full px-3 py-2 rounded-lg border border-[#382c22]/15 text-xs text-[#231f1c] bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#231f1c]" htmlFor="cEmail">
                  Email Address
                </label>
                <input
                  id="cEmail"
                  type="email"
                  required
                  value={shippingData.email}
                  onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                  placeholder="eleanor@example.com"
                  className="w-full px-3 py-2 rounded-lg border border-[#382c22]/15 text-xs text-[#231f1c] bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#231f1c]" htmlFor="cStreet">
                  Street Address
                </label>
                <input
                  id="cStreet"
                  type="text"
                  required
                  value={shippingData.street}
                  onChange={(e) => setShippingData({ ...shippingData, street: e.target.value })}
                  placeholder="144 Botanical Way, Apt 3B"
                  className="w-full px-3 py-2 rounded-lg border border-[#382c22]/15 text-xs text-[#231f1c] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#231f1c]" htmlFor="cCity">
                    City
                  </label>
                  <input
                    id="cCity"
                    type="text"
                    required
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    placeholder="Portland"
                    className="w-full px-3 py-2 rounded-lg border border-[#382c22]/15 text-xs text-[#231f1c] bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#231f1c]" htmlFor="cState">
                    State / Region
                  </label>
                  <input
                    id="cState"
                    type="text"
                    required
                    value={shippingData.state}
                    onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                    placeholder="OR"
                    className="w-full px-3 py-2 rounded-lg border border-[#382c22]/15 text-xs text-[#231f1c] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#231f1c]" htmlFor="cZip">
                    Postal Code
                  </label>
                  <input
                    id="cZip"
                    type="text"
                    required
                    value={shippingData.postalCode}
                    onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                    placeholder="97201"
                    className="w-full px-3 py-2 rounded-lg border border-[#382c22]/15 text-xs text-[#231f1c] bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#231f1c]" htmlFor="cCountry">
                    Country
                  </label>
                  <input
                    id="cCountry"
                    type="text"
                    required
                    value={shippingData.country}
                    onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#382c22]/15 text-xs text-[#231f1c] bg-white"
                  />
                </div>
              </div>
            </form>
          )}

          {step === "confirmed" && completedOrder && (
            <div className="py-6 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-[#485343]/15 text-[#485343] mx-auto flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#231f1c]">
                  Order Successfully Placed
                </h3>
                <p className="text-xs text-[#6b635c] mt-1">
                  Confirmation ID: <span className="font-mono font-semibold text-[#231f1c]">{completedOrder.id}</span>
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#382c22]/10 text-left space-y-2 text-xs">
                <p className="font-semibold text-[#231f1c] border-b border-[#382c22]/10 pb-1.5">
                  Order Summary
                </p>
                <div className="space-y-1 text-[#5a524a]">
                  {completedOrder.items.map((it: any) => (
                    <div key={it.productId} className="flex justify-between">
                      <span>{it.quantity}x {it.name}</span>
                      <span>${it.lineTotal}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-1 border-t border-[#382c22]/10">
                    <span>Shipping:</span>
                    <span>{completedOrder.shipping === 0 ? "Free" : `$${completedOrder.shipping}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#231f1c]">
                    <span>Total Paid:</span>
                    <span>${completedOrder.total}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#6b635c]">
                A receipt has been dispatched to {completedOrder.email}. Your candles will be cured and dispatched in 2 business days.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== "confirmed" && items.length > 0 && (
          <div className="p-5 border-t border-[#382c22]/10 bg-white space-y-3">
            <div className="space-y-1.5 text-xs text-[#5a524a]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#231f1c]">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Studio Shipping</span>
                <span>{shippingFee === 0 ? "Complimentary" : `$${shippingFee}`}</span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-[#382c22]/10 text-sm font-bold text-[#231f1c]">
                <span>Total</span>
                <span>${finalTotal}</span>
              </div>
            </div>

            {step === "cart" && (
              <button
                type="button"
                onClick={() => setStep("checkout")}
                className="w-full py-3 px-4 rounded-lg bg-[#231f1c] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#3d3630] transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === "checkout" && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className="w-1/3 py-2.5 px-3 rounded-lg border border-[#382c22]/20 text-xs font-medium text-[#231f1c] hover:bg-[#f4eee3]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-2/3 py-2.5 px-3 rounded-lg bg-[#231f1c] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#3d3630] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Placing Order...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Confirm &amp; Place Order</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
