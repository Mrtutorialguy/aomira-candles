"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "./schemas";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  shippingFee: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function isValidCartItem(item: any): item is CartItem {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof item.quantity === "number" &&
    item.quantity > 0 &&
    Number.isInteger(item.quantity) &&
    typeof item.product === "object" &&
    item.product !== null &&
    typeof item.product.id === "string" &&
    typeof item.product.price === "number" &&
    typeof item.product.name === "string"
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem("aomira_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every(isValidCartItem)) {
          setItems(parsed);
        } else {
          localStorage.removeItem("aomira_cart");
        }
      }
    } catch {
      localStorage.removeItem("aomira_cart");
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("aomira_cart", JSON.stringify(items));
      } catch {
        // ignore storage errors
      }
    }
  }, [items, isMounted]);

  const addToCart = (product: Product, quantity = 1) => {
    const validQty = Math.max(1, Math.floor(quantity));
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + validQty }
            : item
        );
      }
      return [...prev, { product, quantity: validQty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const cleanQty = Math.floor(quantity);
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: cleanQty } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 70;
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 6;
  const finalTotal = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        freeShippingThreshold,
        shippingFee,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
