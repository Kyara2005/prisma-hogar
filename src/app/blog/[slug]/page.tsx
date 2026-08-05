import { AppImage } from "@/components/AppImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getPostBySlug } from "@/data/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artículo" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="pt-16 sm:pt-20">
      <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden sm:h-[48vh]">
        <AppImage
          src={post.cover}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-10 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            {post.category} · {post.readTime}
          </p>
          <h1 className="mt-2 font-display text-3xl text-white sm:text-5xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link
          href="/blog"
          className="text-sm font-medium text-accent-deep hover:underline"
        >
          ← Volver al blog
        </Link>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {post.content.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        {post.videoUrl && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-display text-2xl text-ink">Ver el video</h2>
            <p className="mt-2 text-sm text-muted">
              Recomendación en Instagram Reel — ábrelo para ver la colección en
              movimiento.
            </p>
            <a
              href={post.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              Abrir reel en Instagram
            </a>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/#tienda"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Ir a la tienda
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink"
          >
            Más recomendaciones
          </Link>
        </div>
      </div>
    </article>
  );
}
