import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/paths";

function resolveSrc(src: ImageProps["src"]): ImageProps["src"] {
  if (typeof src !== "string") return src;
  return withBasePath(src);
}

/** next/image con basePath correcto para GitHub Pages */
export function AppImage({ src, alt, ...props }: ImageProps) {
  return <Image {...props} src={resolveSrc(src)} alt={alt} unoptimized />;
}
