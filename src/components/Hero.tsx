import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src="/hero.jpg"
        alt="Colección de ropa de cama exquisita"
        fill
        priority
        className="object-cover object-[center_40%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/45 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 md:justify-center md:pb-0">
        <div className="max-w-xl animate-rise">
          <div className="mb-5 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 rounded-full bg-white/95 object-contain p-1 shadow-lg"
              priority
            />
            <p className="font-display text-3xl text-white sm:text-4xl md:text-5xl">
              Prisma Hogar
            </p>
          </div>
          <h1 className="font-display text-3xl leading-[1.1] text-white sm:text-4xl md:text-5xl">
            Colección de ropa de cama exquisita
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
            Sábanas, cobijas, duvets y almohadas pensadas para un descanso
            cálido, limpio y con estilo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#tienda"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-surface-2"
            >
              Comprar ahora
            </Link>
            <Link
              href="/#nosotros"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Conocernos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
