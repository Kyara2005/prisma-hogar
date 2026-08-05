import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src="/hero.png"
        alt="Colección de ropa de cama exquisita"
        fill
        priority
        className="object-cover object-[center_40%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/50 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/30" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 md:justify-center md:pb-0">
        <div className="max-w-xl animate-rise">
          <div className="mb-5 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 rounded-full bg-white object-contain p-1.5 shadow-lg"
              priority
              unoptimized
            />
            <p className="font-display text-3xl text-white drop-shadow-md sm:text-4xl md:text-5xl">
              Prisma Hogar
            </p>
          </div>
          <h1 className="font-display text-3xl leading-[1.1] text-white drop-shadow-md sm:text-4xl md:text-5xl">
            Colección de ropa de cama exquisita
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/95 sm:text-lg">
            Sábanas, cobijas, duvets y almohadas pensadas para un descanso
            cálido, limpio y con estilo.
          </p>
          <div className="mt-8 flex max-w-md flex-col gap-3">
            <Link
              href="/#tienda"
              className="rounded-full bg-white px-7 py-3.5 text-center text-base font-bold text-ink shadow-lg transition hover:bg-surface-2 hover:shadow-xl"
            >
              Comprar ahora
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/#nosotros"
                className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Conocernos
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
