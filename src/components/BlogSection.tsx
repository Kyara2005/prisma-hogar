"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppImage } from "./AppImage";
import { blogPosts } from "@/data/blog";

function BeddingShapes() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="animate-float absolute -left-4 top-16 h-20 w-28 text-accent/25 sm:left-6 sm:h-24 sm:w-36"
        viewBox="0 0 120 80"
        fill="currentColor"
      >
        <ellipse cx="60" cy="40" rx="52" ry="28" />
      </svg>
      <svg
        className="animate-float-alt absolute right-2 top-24 h-16 w-28 text-ink/10 sm:right-10 sm:h-20 sm:w-36"
        viewBox="0 0 140 90"
        fill="currentColor"
      >
        <rect x="10" y="35" width="120" height="40" rx="10" />
        <rect x="18" y="18" width="48" height="28" rx="12" />
        <rect x="74" y="18" width="48" height="28" rx="12" />
      </svg>
    </div>
  );
}

export function BlogSection({ limit }: { limit?: number }) {
  const posts = limit ? blogPosts.slice(0, limit) : blogPosts;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (posts.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % posts.length);
    }, 4500);
    return () => clearInterval(id);
  }, [posts.length]);

  const active = posts[index] ?? posts[0];

  return (
    <section
      id="blog"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24"
    >
      <div className="absolute inset-0">
        {posts.map((post, i) => (
          <div
            key={`bg-${post.slug}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <AppImage
              src={post.cover}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-background/86" />
        <div className="absolute inset-0 bg-gradient-to-br from-surface/92 via-background/80 to-ink/25" />
      </div>

      <BeddingShapes />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface-2 shadow-lg sm:aspect-[5/4] lg:aspect-[4/5]">
          {posts.map((post, i) => (
            <div
              key={post.slug}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <AppImage
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/75">
              {active.category} · {active.readTime}
              {active.videoUrl ? " · Video" : ""}
            </p>
            <p className="mt-2 font-display text-2xl text-white sm:text-3xl">
              {active.title}
            </p>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {posts.map((post, i) => (
              <button
                key={`dot-${post.slug}`}
                type="button"
                aria-label={post.title}
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
            Blog
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            Recomendaciones para tu hogar
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {active.excerpt}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/blog/${active.slug}`}
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              Leer artículo
            </Link>
            {limit && (
              <Link
                href="/blog"
                className="rounded-full border border-line bg-surface/80 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-surface"
              >
                Ver todo el blog
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
