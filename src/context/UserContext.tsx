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

type StoredAccount = UserProfile & {
  password: string;
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

export type PaymentMethod = "deuna" | "card" | "transfer";

export type DeliveryMode = "address" | "location";

export type Purchase = {
  id: string;
  date: string;
  total: number;
  shipping: number;
  address: string;
  phone?: string;
  note?: string;
  paymentMethod?: PaymentMethod;
  deliveryMode?: DeliveryMode;
  location?: { lat: number; lng: number };
  customerName?: string;
  customerEmail?: string;
  items: PurchaseItem[];
};

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  deuna: "DeUna",
  card: "Tarjeta",
  transfer: "Transferencia",
};

type AuthResult = { ok: true } | { ok: false; error: string };

type UserContextValue = {
  user: UserProfile | null;
  purchases: Purchase[];
  isAuthOpen: boolean;
  authMode: "login" | "register" | "profile";
  openAuth: (mode?: "login" | "register" | "profile") => void;
  closeAuth: () => void;
  setAuthMode: (mode: "login" | "register" | "profile") => void;
  login: (data: { email: string; password: string }) => AuthResult;
  register: (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => AuthResult;
  updateProfile: (data: Partial<UserProfile>) => void;
  logout: () => void;
  savePurchase: (purchase: Omit<Purchase, "id" | "date">) => Purchase;
};

const UserContext = createContext<UserContextValue | null>(null);
const SESSION_KEY = "prisma-hogar-session";
const ACCOUNTS_KEY = "prisma-hogar-accounts";
const PURCHASES_KEY = "prisma-hogar-purchases";

function readAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredAccount[];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function purchasesKey(email: string) {
  return `${PURCHASES_KEY}:${email.toLowerCase()}`;
}

function toProfile(account: StoredAccount): UserProfile {
  return {
    name: account.name,
    email: account.email,
    phone: account.phone,
    createdAt: account.createdAt,
  };
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "profile">(
    "login",
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawSession = localStorage.getItem(SESSION_KEY);
      if (rawSession) {
        const session = JSON.parse(rawSession) as UserProfile;
        const accounts = readAccounts();
        const account = accounts.find(
          (a) => a.email === session.email.toLowerCase(),
        );
        if (account) {
          setUser(toProfile(account));
          const rawPurchases = localStorage.getItem(
            purchasesKey(account.email),
          );
          if (rawPurchases) {
            setPurchases(JSON.parse(rawPurchases) as Purchase[]);
          }
        } else {
          // Migración: sesión antigua sin cuenta registrada
          setUser(session);
          const legacy = localStorage.getItem(PURCHASES_KEY);
          if (legacy) setPurchases(JSON.parse(legacy) as Purchase[]);
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user, hydrated]);

  useEffect(() => {
    if (!hydrated || !user) return;
    localStorage.setItem(purchasesKey(user.email), JSON.stringify(purchases));
  }, [purchases, user, hydrated]);

  const openAuth = useCallback(
    (mode?: "login" | "register" | "profile") => {
      if (mode) setAuthMode(mode);
      else setAuthMode(user ? "profile" : "login");
      setIsAuthOpen(true);
    },
    [user],
  );

  const closeAuth = useCallback(() => setIsAuthOpen(false), []);

  const login = useCallback(
    (data: { email: string; password: string }): AuthResult => {
      const email = data.email.trim().toLowerCase();
      const password = data.password;
      const accounts = readAccounts();
      const account = accounts.find((a) => a.email === email);

      if (!account) {
        return {
          ok: false,
          error: "No existe una cuenta con ese correo. Regístrate primero.",
        };
      }
      if (account.password !== password) {
        return { ok: false, error: "Contraseña incorrecta." };
      }

      setUser(toProfile(account));
      try {
        const rawPurchases = localStorage.getItem(purchasesKey(email));
        setPurchases(
          rawPurchases ? (JSON.parse(rawPurchases) as Purchase[]) : [],
        );
      } catch {
        setPurchases([]);
      }
      setIsAuthOpen(false);
      return { ok: true };
    },
    [],
  );

  const register = useCallback(
    (data: {
      name: string;
      email: string;
      phone?: string;
      password: string;
    }): AuthResult => {
      const email = data.email.trim().toLowerCase();
      const accounts = readAccounts();

      if (accounts.some((a) => a.email === email)) {
        return {
          ok: false,
          error: "Este correo ya está registrado. Inicia sesión.",
        };
      }
      if (data.password.length < 4) {
        return {
          ok: false,
          error: "La contraseña debe tener al menos 4 caracteres.",
        };
      }

      const account: StoredAccount = {
        name: data.name.trim(),
        email,
        phone: data.phone?.trim() || undefined,
        password: data.password,
        createdAt: new Date().toISOString(),
      };

      writeAccounts([...accounts, account]);
      setUser(toProfile(account));
      setPurchases([]);
      setIsAuthOpen(false);
      return { ok: true };
    },
    [],
  );

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...data };
      if (data.email) next.email = data.email.trim().toLowerCase();

      const accounts = readAccounts();
      const idx = accounts.findIndex((a) => a.email === prev.email);
      if (idx >= 0) {
        accounts[idx] = {
          ...accounts[idx],
          name: next.name,
          email: next.email,
          phone: next.phone,
        };
        writeAccounts(accounts);
      }
      return next;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setPurchases([]);
  }, []);

  const savePurchase = useCallback((purchase: Omit<Purchase, "id" | "date">) => {
    const entry: Purchase = {
      ...purchase,
      id: `PH-${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
    };
    setPurchases((prev) => [entry, ...prev]);
    return entry;
  }, []);

  const value = useMemo(
    () => ({
      user,
      purchases,
      isAuthOpen,
      authMode,
      openAuth,
      closeAuth,
      setAuthMode,
      login,
      register,
      updateProfile,
      logout,
      savePurchase,
    }),
    [
      user,
      purchases,
      isAuthOpen,
      authMode,
      openAuth,
      closeAuth,
      login,
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
