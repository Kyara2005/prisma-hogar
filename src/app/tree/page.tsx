import { AppImage } from "@/components/AppImage";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "WhatsApp, Instagram, Facebook, TikTok y ubicación de Prisma Hogar.",
};

const links = [
  {
    label: "WhatsApp",
    href: "https://wa.me/593993480433",
    detail: "+593 99 348 0433",
    icon: "wa",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/prismahogarsa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    detail: "@prismahogarsa",
    icon: "ig",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/PrismaHogarSA",
    detail: "PrismaHogarSA",
    icon: "fb",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@prismahogarsa",
    detail: "@prismahogarsa",
    icon: "tt",
  },
  {
    label: "Ubicación",
    href: "https://maps.app.goo.gl/QvSncPigknvD7NKS7",
    detail: "Ver en Google Maps",
    icon: "map",
  },
];

export default function TreePage() {
  return (
    <div className="relative min-h-[100svh] overflow-hidden px-4 pb-16 pt-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <AppImage
          src="/hero.png"
          alt=""
          fill
          className="object-cover opacity-25 blur-[2px]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative mx-auto w-full max-w-md animate-rise">
        <div className="flex flex-col items-center text-center">
          <AppImage
            src="/logo.png"
            alt="Prisma Hogar"
            width={88}
            height={88}
            className="h-[88px] w-[88px] rounded-full bg-white object-contain p-2 shadow-lg"
            priority
            unoptimized
          />
          <h1 className="mt-4 font-display text-3xl text-ink">Prisma Hogar</h1>
          <p className="mt-2 text-sm text-muted">
            Ropa de cama exquisita · Ecuador
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-ink">
                <TreeIcon name={link.icon} />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block font-semibold text-ink">{link.label}</span>
                <span className="block truncate text-sm text-muted">
                  {link.detail}
                </span>
              </span>
              <span className="text-muted">→</span>
            </a>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/#tienda"
            className="rounded-full bg-ink py-3 text-center text-sm font-semibold text-white"
          >
            Ir a la tienda
          </Link>
          <Link
            href="/"
            className="rounded-full border border-line bg-surface py-3 text-center text-sm font-semibold text-ink"
          >
            Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function TreeIcon({ name }: { name: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "wa") {
    return (
      <svg {...common}>
        <path d="M20 11.5a8.5 8.5 0 0 1-12.7 7.4L4 20l1.2-3.1A8.5 8.5 0 1 1 20 11.5Z" />
        <path d="M9.5 10.2c.4 1.5 2 3 3.5 3.5l1.2-.7c.2-.1.4 0 .5.1l1.1 1.1c.2.2.2.4 0 .6-.7.6-1.8.9-2.8.5-2.3-.8-4.1-2.6-4.9-4.9-.4-1 .0-2 .5-2.8.2-.2.4-.2.6 0l1.1 1.1c.2.2.2.4.1.5l-.7 1.2Z" />
      </svg>
    );
  }
  if (name === "ig") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "fb") {
    return (
      <svg {...common}>
        <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9Z" />
      </svg>
    );
  }
  if (name === "tt") {
    return (
      <svg {...common}>
        <path d="M14 4v10.2a3.8 3.8 0 1 1-3.2-3.75V13a1.5 1.5 0 1 0 1.2 1.47V4h2Z" />
        <path d="M14 7.5c1.2 1.6 2.8 2.5 4.5 2.7" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
