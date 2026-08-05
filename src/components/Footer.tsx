import Link from "next/link";
import { AppImage } from "./AppImage";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-[#f3efe8]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <AppImage
              src="/logo.png"
              alt="Prisma Hogar"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-white object-contain p-1"
              unoptimized
            />
            <span className="font-display text-2xl tracking-tight">
              Prisma Hogar
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Ropa de cama exquisita para dormitorios que se sienten como un
            refugio. Sábanas, cobijas, duvets y más, con envío en Ecuador.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
            Explorar
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/#tienda" className="hover:text-white">
                Tienda
              </Link>
            </li>
            <li>
              <Link href="/catalogo" className="hover:text-white">
                Catálogo completo
              </Link>
            </li>
            <li>
              <Link href="/#nosotros" className="hover:text-white">
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/carrito" className="hover:text-white">
                Carrito
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
            Conéctate
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/tree" className="hover:text-white">
                Linktree / Contacto
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/593993480433"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/prismahogarsa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 sm:px-6">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-white/55">
          Esto es un demo comercial de Fermenta para este negocio con mucho
          esfuerzo, en el caso de ser rechazado completamente solicitar por
          favor darlo de baja al número{" "}
          <a
            href="https://wa.me/593969088646"
            className="underline underline-offset-2 hover:text-white"
          >
            0969088646
          </a>{" "}
          —{" "}
          <a
            href="https://fermenta.online"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white"
          >
            fermenta.online
          </a>
        </p>
        <p className="mt-3 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Prisma Hogar S.A. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
