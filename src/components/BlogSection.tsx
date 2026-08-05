import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

function BeddingShapes() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Almohada */}
      <svg
        className="animate-float absolute -left-4 top-16 h-20 w-28 text-accent/25 sm:left-6 sm:h-24 sm:w-36"
        viewBox="0 0 120 80"
        fill="currentColor"
      >
        <ellipse cx="60" cy="40" rx="52" ry="28" />
        <ellipse cx="60" cy="40" rx="40" ry="18" className="opacity-40" />
      </svg>
      {/* Cama / colchón */}
      <svg
        className="animate-float-alt absolute right-2 top-24 h-16 w-28 text-ink/10 sm:right-10 sm:h-20 sm:w-36"
        viewBox="0 0 140 90"
        fill="currentColor"
      >
        <rect x="10" y="35" width="120" height="40" rx="10" />
        <rect x="18" y="18" width="48" height="28" rx="12" />
        <rect x="74" y="18" width="48" height="28" rx="12" />
      </svg>
      {/* Almohada chica */}
      <svg
        className="animate-drift absolute bottom-20 left-[12%] hidden h-14 w-20 text-accent/20 md:block"
        viewBox="0 0 100 70"
        fill="currentColor"
      >
        <ellipse cx="50" cy="35" rx="42" ry="24" />
      </svg>
      {/* Edredón ondulado */}
      <svg
        className="animate-float absolute bottom-10 right-[8%] h-16 w-32 text-ink/10"
        viewBox="0 0 160 80"
        fill="currentColor"
      >
        <path d="M10 50c20-25 40-25 60 0s40 25 60 0v20c-20 20-40 20-60 0s-40-20-60 0V50Z" />
      </svg>
      {/* Cojín */}
      <svg
        className="animate-float-alt absolute left-[45%] top-10 hidden h-12 w-12 text-accent/20 lg:block"
        viewBox="0 0 64 64"
        fill="currentColor"
      >
        <rect x="8" y="8" width="48" height="48" rx="14" />
      </svg>
    </div>
  );
}

export function BlogSection({ limit }: { limit?: number }) {
  const posts = limit ? blogPosts.slice(0, limit) : blogPosts;

  return (
    <section
      id="blog"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1600&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-background/85 to-background/80" />
      </div>

      <BeddingShapes />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Blog
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
              Recomendaciones para tu hogar
            </h2>
            <p className="mt-3 text-muted">
              Guías de cuidado, estilo de cama y un video especial en cómo
              elegir sábanas.
            </p>
          </div>
          {limit && (
            <Link
              href="/blog"
              className="text-sm font-semibold text-accent-deep underline-offset-4 hover:underline"
            >
              Ver todo el blog →
            </Link>
          )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-line bg-surface/95 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(31,28,24,0.08)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                {post.videoUrl && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
                    Video
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="font-semibold uppercase tracking-wide text-accent">
                    {post.category}
                  </span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-2 font-display text-xl leading-snug text-ink group-hover:text-accent-deep">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
