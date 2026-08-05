import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export function BlogSection({ limit }: { limit?: number }) {
  const posts = limit ? blogPosts.slice(0, limit) : blogPosts;

  return (
    <section id="blog" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Blog
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
              Recomendaciones para tu hogar
            </h2>
            <p className="mt-3 text-muted">
              Guías de cuidado, estilo de cama y un video especial de nuestra
              colección.
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
              className="group overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(31,28,24,0.08)]"
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
