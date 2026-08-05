export type Category =
  | "sabanas"
  | "cobijas"
  | "duvets"
  | "edredones"
  | "protectores"
  | "almohadas";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: Category;
  price: number;
  compareAt?: number;
  description: string;
  image: string;
  sizes: string[];
  colors: string[];
  featured?: boolean;
};

export const categories: { id: Category | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "sabanas", label: "Sábanas" },
  { id: "cobijas", label: "Cobijas" },
  { id: "duvets", label: "Duvets" },
  { id: "edredones", label: "Edredones" },
  { id: "protectores", label: "Protectores" },
  { id: "almohadas", label: "Almohadas" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Juego de Sábanas Lino Suave",
    slug: "sabanas-lino-suave",
    category: "sabanas",
    price: 89.9,
    compareAt: 110,
    description:
      "Juego de sábanas de algodón-lino con tacto fresco y caída natural. Incluye sábana bajera, encimera y fundas de almohada.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    sizes: ["1 plaza", "1.5 plazas", "2 plazas", "Queen", "King"],
    colors: ["Marfil", "Arena", "Gris niebla"],
    featured: true,
  },
  {
    id: "2",
    name: "Sábanas Percale 300 hilos",
    slug: "sabanas-percale-300",
    category: "sabanas",
    price: 74.5,
    description:
      "Percale fresco y matte, ideal para climas cálidos. Resistente al lavado y con acabado hotelero.",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    sizes: ["1.5 plazas", "2 plazas", "Queen", "King"],
    colors: ["Blanco", "Carbón", "Verde salvia"],
    featured: true,
  },
  {
    id: "3",
    name: "Cobija Sherpa Nube",
    slug: "cobija-sherpa-nube",
    category: "cobijas",
    price: 54.9,
    description:
      "Cobija reversible: felpa suave por un lado y sherpa esponjoso por el otro. Perfecta para noches frescas.",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
    sizes: ["Individual", "Matrimonial", "Queen"],
    colors: ["Crema", "Taupe", "Grafito"],
    featured: true,
  },
  {
    id: "4",
    name: "Manta Tejida Andes",
    slug: "manta-tejida-andes",
    category: "cobijas",
    price: 62,
    description:
      "Tejido de punto grueso con inspiración andina. Aporta textura y calidez a tu dormitorio.",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    sizes: ["Throw", "Queen"],
    colors: ["Natural", "Terracota suave", "Negro"],
  },
  {
    id: "5",
    name: "Duvet Pluma Premium",
    slug: "duvet-pluma-premium",
    category: "duvets",
    price: 149,
    compareAt: 179,
    description:
      "Relleno de pluma/plumón con funda de algodón. Volumen ligero y aislamiento equilibrado todo el año.",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    sizes: ["2 plazas", "Queen", "King"],
    colors: ["Blanco"],
    featured: true,
  },
  {
    id: "6",
    name: "Funda Duvet Satén Mate",
    slug: "funda-duvet-saten",
    category: "duvets",
    price: 68,
    description:
      "Funda para duvet con botones ocultos y brillo satinado sutil. Fácil de lavar y planchar.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    sizes: ["Queen", "King"],
    colors: ["Marfil", "Piedra", "Azul niebla"],
  },
  {
    id: "7",
    name: "Edredón Quilt Geométrico",
    slug: "edredon-quilt-geometrico",
    category: "edredones",
    price: 95,
    description:
      "Edredón acolchado con patrón geométrico contemporáneo. Ligero, reversible y muy versátil.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    sizes: ["1.5 plazas", "2 plazas", "Queen"],
    colors: ["Negro/Blanco", "Arena"],
    featured: true,
  },
  {
    id: "8",
    name: "Edredón Microfibra Cloud",
    slug: "edredon-microfibra-cloud",
    category: "edredones",
    price: 79.9,
    description:
      "Relleno hipoalergénico de microfibra con tacto pluma. Ideal para quienes buscan comodidad sin cuidado especial.",
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    sizes: ["1 plaza", "2 plazas", "Queen", "King"],
    colors: ["Blanco", "Gris perla"],
  },
  {
    id: "9",
    name: "Protector Impermeable Bambú",
    slug: "protector-impermeable-bambu",
    category: "protectores",
    price: 39.9,
    description:
      "Protector matelassado impermeable con cara de bambú. Transpirable, silencioso y con elásticos en las esquinas.",
    image:
      "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80",
    sizes: ["1 plaza", "1.5 plazas", "2 plazas", "Queen", "King"],
    colors: ["Blanco"],
  },
  {
    id: "10",
    name: "Fundas Protectoras de Almohada",
    slug: "fundas-protectoras-almohada",
    category: "protectores",
    price: 18.5,
    description:
      "Pack de 2 fundas protectoras con cierre. Barrera contra ácaros y manchas, sin ruido de plástico.",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
    sizes: ["Estándar", "King"],
    colors: ["Blanco"],
  },
  {
    id: "11",
    name: "Almohada Memory Foam Ergo",
    slug: "almohada-memory-foam-ergo",
    category: "almohadas",
    price: 45,
    description:
      "Espuma viscoelástica de densidad media con funda lavable. Contorno ergonómico para cuello y hombros.",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
    sizes: ["Estándar"],
    colors: ["Blanco"],
    featured: true,
  },
  {
    id: "12",
    name: "Almohadas Duo Soft (par)",
    slug: "almohadas-duo-soft",
    category: "almohadas",
    price: 52,
    compareAt: 64,
    description:
      "Par de almohadas de fibra siliconada con loft medio. Esponjosas, hipoalergénicas y fáciles de esponjar.",
    image:
      "https://images.unsplash.com/photo-1616627561950-56f62020575b?w=800&q=80",
    sizes: ["Estándar", "Queen"],
    colors: ["Blanco"],
  },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
