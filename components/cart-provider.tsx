"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = { slug: string; name: string; qty: number; price: number };

type CartContextValue = {
  cart: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  addItem: (item: Omit<CartItem, "qty">, quantity?: number) => void;
  changeQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  notice: string;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "elevenAlphaCart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
        if (Array.isArray(saved)) {
          setCart(
            saved.filter(
              (item) =>
                item &&
                typeof item.slug === "string" &&
                typeof item.name === "string" &&
                Number(item.qty) > 0,
            ),
          );
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 2400);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const addItem = useCallback(
    (item: Omit<CartItem, "qty">, quantity = 1) => {
      const safeQuantity = Math.max(1, Math.floor(quantity));
      setCart((current) => {
        const existing = current.find((entry) => entry.slug === item.slug);
        if (existing) {
          return current.map((entry) =>
            entry.slug === item.slug
              ? { ...entry, qty: entry.qty + safeQuantity }
              : entry,
          );
        }
        return [...current, { ...item, qty: safeQuantity }];
      });
      setNotice(`${item.name} added to your pack.`);
    },
    [],
  );

  const changeQuantity = useCallback((slug: string, quantity: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.slug === slug ? { ...item, qty: Math.max(0, quantity) } : item,
        )
        .filter((item) => item.qty > 0),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setCart((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const discount = Math.floor(itemCount / 5) * 10;
  const total = Math.max(0, subtotal - discount);

  const value = useMemo(
    () => ({
      cart,
      itemCount,
      subtotal,
      discount,
      total,
      addItem,
      changeQuantity,
      removeItem,
      clearCart: () => setCart([]),
      notice,
    }),
    [
      cart,
      itemCount,
      subtotal,
      discount,
      total,
      addItem,
      changeQuantity,
      removeItem,
      notice,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

export function CartToast() {
  const { notice } = useCart();
  return (
    <div className={`cart-toast ${notice ? "is-visible" : ""}`} aria-live="polite">
      {notice}
    </div>
  );
}

export function MobileCartBar() {
  const { itemCount, total } = useCart();
  if (!itemCount) return null;
  return (
    <Link className="mobile-cart-bar" href="/order#checkout">
      <span>
        <b>{itemCount}</b> {itemCount === 1 ? "item" : "items"} in your pack
      </span>
      <strong>View cart · ${total}</strong>
    </Link>
  );
}
