import { BlogSection } from "@/components/BlogSection";
import { Hero } from "@/components/Hero";
import { Nosotros } from "@/components/Nosotros";
import { ProductGrid } from "@/components/ProductGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px bg-line" />
      </div>
      <Nosotros />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px bg-line" />
      </div>
      <BlogSection limit={3} />
    </>
  );
}
