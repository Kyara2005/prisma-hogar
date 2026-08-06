"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/context/CartContext";

export type UserProfile = {
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
};

export type PurchaseItem = {
  productId: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
};

export type Purchase = {
  id: string;
  date: string;
  total: number;
  shipping: number;
  address: string;
  phone: string;
  note?: string;
  items: PurchaseItem[];
};

type UserContextValue = {
  user: UserProfile | null;
  purchases: Purchase[];
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  register: (data: { name: string; email: string; phone?: string }) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  logout: () => void;
  savePurchase: (purchase: Omit<Purchase, "id" | "date">) => void;
};

const UserContext = createContext<UserContextValue | null>(null);
const USER_KEY = "prisma-hogar-user";
const PURCHASES_KEY = "prisma-hogar-purchases";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem(USER_KEY);
      const rawPurchases = localStorage.getItem(PURCHASES_KEY);
      if (rawUser) setUser(JSON.parse(rawUser) as UserProfile);
      if (rawPurchases) setPurchases(JSON.parse(rawPurchases) as Purchase[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(purchases));
  }, [purchases, hydrated]);

  const openAuth = useCallback(() => setIsAuthOpen(true), []);
  const closeAuth = useCallback(() => setIsAuthOpen(false), []);

  const register = useCallback(
    (data: { name: string; email: string; phone?: string }) => {
      setUser((prev) => ({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || undefined,
        createdAt: prev?.createdAt ?? new Date().toISOString(),
      }));
      setIsAuthOpen(false);
    },
    [],
  );

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const savePurchase = useCallback((purchase: Omit<Purchase, "id" | "date">) => {
    const entry: Purchase = {
      ...purchase,
      id: `ord-${Date.now()}`,
      date: new Date().toISOString(),
    };
    setPurchases((prev) => [entry, ...prev]);
  }, []);

  const value = useMemo(
    () => ({
      user,
      purchases,
      isAuthOpen,
      openAuth,
      closeAuth,
      register,
      updateProfile,
      logout,
      savePurchase,
    }),
    [
      user,
      purchases,
      isAuthOpen,
      openAuth,
      closeAuth,
      register,
      updateProfile,
      logout,
      savePurchase,
    ],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser debe usarse dentro de UserProvider");
  return ctx;
}

export function cartItemsToPurchaseItems(items: CartItem[]): PurchaseItem[] {
  return items.map((i) => ({
    productId: i.product.id,
    name: i.product.name,
    size: i.size,
    color: i.color,
    quantity: i.quantity,
    price: i.product.price,
    image: i.product.image,
  }));
}
