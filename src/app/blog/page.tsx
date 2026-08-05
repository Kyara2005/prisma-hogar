import type { Metadata } from "next";
import { BlogSection } from "@/components/BlogSection";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Recomendaciones de ropa de cama, cuidados y estilo para tu dormitorio.",
};

export default function BlogPage() {
  return (
    <div className="pt-16 sm:pt-20">
      <div className="border-b border-line bg-surface/60">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Recomendaciones
          </p>
          <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
            Blog Prisma Hogar
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Ideas prácticas, cuidados textiles y un video de nuestra colección
            para inspirarte al armar tu cama.
          </p>
        </div>
      </div>
      <BlogSection />
    </div>
  );
}
