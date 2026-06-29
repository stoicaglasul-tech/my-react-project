const BASE = import.meta.env.BASE_URL;
const local = (n) => `${BASE}images/product-${n}.jpg`;

const UNS = 'https://images.unsplash.com';
const uns = (id) => `${UNS}/${id}?w=400&h=400&fit=crop&auto=format`;

const categories = [
  'Home Decor', 'Toys & Games', 'Tools & Gadgets', 'Art & Sculptures',
  'Jewelry', 'Home & Storage', 'Collectibles',
];

const rawProducts = [
  // Home Decor
  { id:  1, name: 'Ceramic Flower Vase',     category: 'Home Decor',       price: 24.99, rating: 4.8, reviews: 142, material: 'Ceramic',   color: 'White',    image: local(1) },
  { id:  2, name: 'Luxury Scented Candle',   category: 'Home Decor',       price: 18.99, rating: 4.9, reviews: 311, material: 'Soy Wax',   color: 'Gold',     image: local(2) },
  { id:  3, name: 'Hexagonal Mirror Set',    category: 'Home Decor',       price: 39.99, rating: 4.7, reviews:  98, material: 'Glass',     color: 'Silver',   image: local(3) },
  { id:  4, name: 'Hand-Painted Bowl',       category: 'Home Decor',       price: 27.99, rating: 4.8, reviews: 134, material: 'Ceramic',   color: 'Teal',     image: local(4) },

  // Toys & Games
  { id:  5, name: 'Plush Dragon Toy',        category: 'Toys & Games',     price: 22.99, rating: 4.9, reviews: 487, material: 'Plush',     color: 'Orange',   image: local(5) },
  { id:  6, name: 'Speed Puzzle Cube',       category: 'Toys & Games',     price: 12.99, rating: 4.6, reviews: 634, material: 'ABS',       color: 'Blue',     image: local(6) },
  { id:  7, name: 'Jump Rope Set',           category: 'Toys & Games',     price: 16.99, rating: 4.7, reviews: 345, material: 'Nylon',     color: 'Green',    image: local(7) },
  { id:  8, name: 'Wooden Spinning Top',     category: 'Toys & Games',     price:  9.99, rating: 4.5, reviews: 289, material: 'Wood',      color: 'Brown',    image: local(8) },

  // Tools & Gadgets
  { id:  9, name: 'Desktop Cable Box',       category: 'Tools & Gadgets',  price: 14.99, rating: 4.7, reviews: 412, material: 'ABS',       color: 'Black',    image: local(9) },
  { id: 10, name: 'Aluminium Phone Stand',   category: 'Tools & Gadgets',  price: 16.99, rating: 4.8, reviews: 287, material: 'Aluminium', color: 'Silver',   image: local(10) },
  { id: 11, name: 'Canvas Tool Roll',        category: 'Tools & Gadgets',  price: 11.99, rating: 4.6, reviews: 198, material: 'Canvas',    color: 'Brown',    image: local(11) },
  { id: 12, name: 'Mechanical Gear Clock',   category: 'Tools & Gadgets',  price: 29.99, rating: 4.8, reviews: 156, material: 'Metal',     color: 'Gold',     image: local(12) },

  // Art & Sculptures
  { id: 13, name: 'Crystal Glass Vase',      category: 'Art & Sculptures', price: 42.99, rating: 4.8, reviews:  89, material: 'Glass',     color: 'White',    image: local(13) },
  { id: 14, name: 'Ceramic Owl Figurine',    category: 'Art & Sculptures', price: 34.99, rating: 4.7, reviews: 134, material: 'Ceramic',   color: 'Brown',    image: local(14) },
  { id: 15, name: 'Eiffel Tower Replica',    category: 'Art & Sculptures', price: 38.99, rating: 4.9, reviews:  78, material: 'Metal',     color: 'Silver',   image: local(15) },
  { id: 16, name: 'Classical Marble Bust',   category: 'Art & Sculptures', price: 54.99, rating: 4.6, reviews:  56, material: 'Resin',     color: 'White',    image: local(16) },

  // Jewelry
  { id: 17, name: 'Faceted Gold Ring',       category: 'Jewelry',          price: 22.99, rating: 4.7, reviews: 134, material: 'Gold',      color: 'Gold',     image: local(17) },
  { id: 18, name: 'Crescent Moon Earrings',  category: 'Jewelry',          price: 14.99, rating: 4.9, reviews: 367, material: 'Silver',    color: 'Silver',   image: local(18) },
  { id: 19, name: 'Star Map Pendant',        category: 'Jewelry',          price: 19.99, rating: 4.8, reviews: 223, material: 'Gold',      color: 'Gold',     image: local(19) },
  { id: 20, name: 'Filigree Bangle',         category: 'Jewelry',          price: 28.99, rating: 4.7, reviews: 167, material: 'Rose Gold', color: 'Rose Gold',image: local(20) },

  // Home & Storage
  { id: 21, name: 'Floating Wall Shelf',     category: 'Home & Storage',   price: 12.99, rating: 4.6, reviews: 334, material: 'Wood',      color: 'Brown',    image: local(21) },
  { id: 22, name: 'Silicone Cable Clips',    category: 'Home & Storage',   price:  8.99, rating: 4.7, reviews: 456, material: 'Silicone',  color: 'Gray',     image: local(22) },
  { id: 23, name: 'Coat Hook Rail',          category: 'Home & Storage',   price: 15.99, rating: 4.8, reviews: 289, material: 'Metal',     color: 'Silver',   image: local(23) },
  { id: 24, name: 'Corner Shelf Bracket',    category: 'Home & Storage',   price: 10.99, rating: 4.5, reviews: 234, material: 'Steel',     color: 'Silver',   image: local(24) },

  // Collectibles
  { id: 25, name: 'Fantasy Wizard Figurine', category: 'Collectibles',     price: 18.99, rating: 4.9, reviews: 312, material: 'Resin',     color: 'Purple',   image: local(25) },
  { id: 26, name: 'Knight Armor Figurine',   category: 'Collectibles',     price: 24.99, rating: 4.8, reviews: 198, material: 'Resin',     color: 'Silver',   image: local(26) },
  { id: 27, name: 'Archer Figurine',         category: 'Collectibles',     price: 21.99, rating: 4.7, reviews: 145, material: 'Resin',     color: 'Brown',    image: local(27) },
  { id: 28, name: 'Viking Warrior Figurine', category: 'Collectibles',     price: 19.99, rating: 4.6, reviews: 267, material: 'Resin',     color: 'Red',      image: local(28) },

  // Extras
  { id: 29, name: 'Ceramic Fox Figurine',    category: 'Art & Sculptures', price: 31.99, rating: 4.9, reviews: 204, material: 'Ceramic',   color: 'Orange',   image: uns('photo-1595154591160-75dc6623945f') },
  { id: 30, name: 'Plush Octopus Toy',       category: 'Toys & Games',     price: 19.99, rating: 4.8, reviews: 388, material: 'Plush',     color: 'Teal',     image: uns('photo-1538292999061-16ca3647ab1c') },
];

export const products = rawProducts.map((p) => ({
  ...p,
  badge: p.rating >= 4.8
    ? (p.reviews > 300 ? 'Bestseller' : 'Top Rated')
    : p.price < 10 ? 'Best Value' : null,
}));

export { categories };
