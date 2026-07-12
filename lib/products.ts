export type Product = {
  slug: string;
  name: string;
  type: string;
  description: string;
  image: string;
  size: string;
  heat: number;
  price: number;
};

export const products: Product[] = [
  {
    slug: "lucys-cajun-campfire",
    name: "Lucy's Cajun Campfire",
    type: "Cajun Mesquite",
    description:
      "Smoky mesquite flavor with a warm Cajun kick and bold campfire finish.",
    image: "/images/lucys-cajun-campfire.jpg",
    size: "2 oz pack",
    heat: 4,
    price: 10,
  },
  {
    slug: "cajun-hick",
    name: "Cajun Hick",
    type: "Hickory Cajun",
    description:
      "Deep hickory smoke layered with balanced Cajun seasoning and heat.",
    image: "/images/cajun-hick.jpg",
    size: "2 oz pack",
    heat: 4,
    price: 10,
  },
  {
    slug: "rub-the-applewood",
    name: "Rub the Applewood",
    type: "Applewood",
    description:
      "Smooth applewood smoke, rich seasoning, and classic jerky flavor.",
    image: "/images/rub-the-applewood.jpg",
    size: "2 oz pack",
    heat: 1,
    price: 10,
  },
  {
    slug: "slap-the-smoke",
    name: "Slap the Smoke",
    type: "BBQ Blend",
    description:
      "Savory barbecue flavor with bold backyard smoke and a smooth finish.",
    image: "/images/slap-the-smoke.jpg",
    size: "2 oz pack",
    heat: 1,
    price: 10,
  },
  {
    slug: "pacific-smokeout",
    name: "Pacific Smokeout",
    type: "Teriyaki Mesquite",
    description:
      "Savory teriyaki sweetness layered with deep mesquite smoke.",
    image: "/images/pacific-smokeout.jpg",
    size: "2 oz pack",
    heat: 0,
    price: 10,
  },
  {
    slug: "danger-close-sticks",
    name: "Danger Close Sticks",
    type: "Jalapeño Cheddar Meat Sticks",
    description:
      "Bold smoke, real cheddar flavor, and a controlled jalapeño kick.",
    image: "/images/danger-close-sticks.jpg",
    size: "3 oz pack",
    heat: 2,
    price: 10,
  },
];
