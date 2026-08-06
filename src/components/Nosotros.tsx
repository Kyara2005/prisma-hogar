"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppImage } from "./AppImage";

const slides = [
  {
    src: "/hero.png",
    caption: "Descanso con identidad ecuatoriana",
  },
  {
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
    caption: "Texturas suaves para cada noche",
  },
  {
    src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",
    caption: "Camas que se sienten como un refugio",
  },
  {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
    caption: "Colecciones pensadas para combinar",
  },
  {
    src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
    caption: "Calidad que se nota al tacto",
  },
];

export function Nosotros() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const active = slides[index];

  return (
    <section
      id="nosotros"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24"
    >
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <AppImage
              src={slide.src}
              alt=""
              fill
              className="object-cover object-[center_35%]"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-background/86" />
        <div className="absolute inset-0 bg-gradient-to-br from-surface/92 via-background/80 to-ink/25" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface-2 shadow-lg sm:aspect-[5/4] lg:aspect-[4/5]">
          {slides.map((slide, i) => (
            <div
              key={`card-${slide.src}`}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <AppImage
                src={slide.src}
                alt="Ambiente Prisma Hogar"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 font-display text-2xl text-white transition-opacity sm:text-3xl">
            {active.caption}
          </p>

          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={`dot-${slide.src}`}
                type="button"
                aria-label={`Imagen ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-5 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
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
