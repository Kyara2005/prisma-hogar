export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  readTime: string;
  category: string;
  content: string[];
  videoUrl?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "como-elegir-sabanas-perfectas",
    title: "Cómo elegir las sábanas perfectas",
    excerpt:
      "Hilos, tejidos y caídas: una guía práctica para dormir mejor sin complicarte con jerga técnica.",
    cover:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    date: "2026-07-12",
    readTime: "5 min",
    category: "Guías",
    content: [
      "Elegir sábanas no se trata solo de color. El tejido define si tu cama se siente fresca, cálida o con ese acabado hotelero que todos buscan.",
      "Si vives en un clima cálido, el percale y el lino son aliados: dejan circular el aire y mantienen una sensación seca. En climas más frescos, un satén de algodón o un jersey aportan más envolvente.",
      "Mira también el gramaje y el acabado. Un buen juego de sábanas se siente suave desde el primer lavado, no después de meses. En Prisma Hogar priorizamos tejidos que envejecen bien.",
      "Tip rápido: mide tu colchón (alto incluido) antes de comprar la bajera. Un elástico justo evita arrugas y deslizamientos molestos durante la noche.",
    ],
  },
  {
    slug: "capas-de-cama-como-un-hotel",
    title: "Capas de cama como en un hotel",
    excerpt:
      "Protector, sábanas, duvet y cobija: el orden correcto para una cama impecable y fácil de mantener.",
    cover:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
    date: "2026-07-28",
    readTime: "4 min",
    category: "Estilo",
    content: [
      "Una cama de hotel se ve abundante porque trabaja en capas, no porque use una sola pieza milagrosa.",
      "Empieza con un protector impermeable y transpirable. Luego sábanas, funda de duvet o edredón, y una cobija ligera al pie de la cama para regular temperatura.",
      "Los cojines decorativos cierran la composición: dos shams grandes, uno de contraste y uno pequeño con textura. Menos es más si los tonos están en la misma familia.",
      "En Prisma Hogar armamos colecciones pensadas para combinar entre sí: cremas, carbones y textiles naturales que se ven caros sin esfuerzo.",
    ],
  },
  {
    slug: "cuidados-de-duvets-y-edredones",
    title: "Cuidados de duvets y edredones",
    excerpt:
      "Cómo lavar, secar y esponjar tu duvet para que conserve volumen y frescura por más tiempo.",
    cover:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
    date: "2026-08-01",
    readTime: "6 min",
    category: "Cuidados",
    content: [
      "El duvet y el edredón son la pieza que más volumen aporta a la cama, y también la que más sufre si se lava mal.",
      "Usa funda siempre que puedas: protege el relleno y reduce lavados completos. Cuando toque lavar, ciclo suave, agua tibia y detergente neutro.",
      "Seca con aire o a baja temperatura y agrega pelotas de tenis limpias (o secadoras especiales) para redistribuir el relleno y evitar grumos.",
      "Guárdalo en una funda de algodón, nunca en plástico cerrado. El aire evita olores y humedad acumulada entre temporadas.",
    ],
  },
  {
    slug: "recomendacion-coleccion-exquisita",
    title: "Recomendación: Colección de ropa de cama exquisita",
    excerpt:
      "Mira cómo lucen nuestras piezas en un dormitorio real y arma tu set favorito con sábanas, cobijas y almohadas.",
    cover:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
    date: "2026-08-05",
    readTime: "3 min",
    category: "Video",
    videoUrl:
      "https://www.instagram.com/reel/Dboe0pcCezh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    content: [
      "En este reel de Instagram te mostramos detalles de nuestra colección: texturas, caídas y combinaciones que transforman cualquier habitación.",
      "Si buscas un look limpio y cálido, empieza por sábanas en tono marfil, un duvet voluminoso y almohadas de contraste en carbón o con un patrón geométrico suave.",
      "Haz clic en el video para ver la recomendación completa en Instagram y luego vuelve a la tienda para armar tu carrito con las piezas que más te gusten.",
    ],
  },
  {
    slug: "almohadas-segun-tu-forma-de-dormir",
    title: "Almohadas según tu forma de dormir",
    excerpt:
      "De lado, boca arriba o boca abajo: qué firmeza y altura conviene para despertar sin tensión.",
    cover:
      "https://images.unsplash.com/photo-1616627561950-56f62020575b?w=1200&q=80",
    date: "2026-06-20",
    readTime: "5 min",
    category: "Guías",
    content: [
      "La almohada correcta no es la más cara: es la que alinea tu cuello con tu columna según cómo duermes.",
      "Si duermes de lado, busca más altura y soporte (memory foam o fibra con loft alto). Boca arriba, una altura media. Boca abajo, lo más bajo y suave posible.",
      "Cambia tus almohadas cada 18–24 meses o cuando pierdan esponjosidad. Un protector lavable alarga su vida útil.",
      "En tienda encontrarás opciones ergonómicas y pares Duo Soft pensados para compartir cama sin pelear por la almohada “buena”.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
