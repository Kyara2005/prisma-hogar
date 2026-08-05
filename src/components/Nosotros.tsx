import Image from "next/image";
import Link from "next/link";

export function Nosotros() {
  return (
    <section
      id="nosotros"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt=""
          fill
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/86" />
        <div className="absolute inset-0 bg-gradient-to-br from-surface/92 via-background/80 to-ink/25" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface-2 shadow-lg sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src="/hero.png"
            alt="Ambiente Prisma Hogar"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 font-display text-2xl text-white sm:text-3xl">
            Descanso con identidad ecuatoriana
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Nosotros
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            Prisma Hogar nace para elevar tu ritual de dormir
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
            <p>
              Somos una marca ecuatoriana dedicada a ropa de cama de calidad:
              sábanas, cobijas, duvets, edredones, protectores y almohadas
              seleccionadas por tacto, durabilidad y estética.
            </p>
            <p>
              Creemos que un dormitorio ordenado y bien texturado cambia el
              ánimo del día. Por eso curamos piezas que combinan entre sí y se
              sienten premium sin complicaciones.
            </p>
            <p>
              Visítanos, escríbenos por WhatsApp o sigue nuestras redes para
              inspiración diaria y lanzamientos.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tree"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              Ver contacto y redes
            </Link>
            <a
              href="https://maps.app.goo.gl/QvSncPigknvD7NKS7"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line bg-surface/80 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-surface"
            >
              Ubicación en Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
