"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { useUser } from "@/context/UserContext";

const tabs = [
  { href: "/", label: "Inicio", icon: "home" as const },
  { href: "/catalogo", label: "Tienda", icon: "shop" as const },
  { href: "/favoritos", label: "Favoritos", icon: "heart" as const },
  { href: "/blog", label: "Blog", icon: "blog" as const },
  { href: "/cuenta", label: "Cuenta", icon: "user" as const },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const { count: favCount } = useFavorites();
  const { user, openAuth } = useUser();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(31,28,24,0.06)] backdrop-blur-md md:hidden"
      aria-label="Navegación móvil"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5 px-1 pt-1.5 pb-1.5">
        {tabs.map((tab) => {
          const active = isActive(pathname, tab.href);

          if (tab.icon === "user" && !user) {
            return (
              <button
                key={tab.href}
                type="button"
                onClick={() => openAuth("login")}
                className={`relative flex flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition ${
                  active ? "text-accent-deep" : "text-muted"
                }`}
              >
                <TabIcon name={tab.icon} active={active} />
                {tab.label}
              </button>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative flex flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition ${
                active ? "text-accent-deep" : "text-muted"
              }`}
            >
              <TabIcon name={tab.icon} active={active} />
              {tab.icon === "heart" && favCount > 0 && (
                <span className="absolute right-2 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-0.5 text-[9px] text-white">
                  {favCount}
                </span>
              )}
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function TabIcon({
  name,
  active,
}: {
  name: "home" | "shop" | "heart" | "blog" | "user";
  active?: boolean;
}) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "home") {
    return (
      <svg {...common}>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
      </svg>
    );
  }
  if (name === "shop") {
    return (
      <svg {...common}>
        <path d="M4 7h16l-1.2 12.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 7Z" />
        <path d="M8 7V5.5A4 4 0 0 1 16 5.5V7" />
      </svg>
    );
  }
  if (name === "heart") {
    return (
      <svg {...common} fill={active ? "currentColor" : "none"}>
        <path d="M12 20s-7-4.4-7-10a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      </svg>
    );
  }
  if (name === "blog") {
    return (
      <svg {...common}>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M8 9h8M8 12h8M8 15h5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5c1.6-3.2 4-4.5 7-4.5s5.4 1.3 7 4.5" />
    </svg>
  );
}
