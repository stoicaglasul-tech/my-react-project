const UNS = 'https://images.unsplash.com';
const img = (id) => `${UNS}/${id}?w=400&h=400&fit=crop&auto=format`;

const categories = [
  'Home Decor', 'Toys & Games', 'Tools & Gadgets', 'Art & Sculptures',
  'Jewelry', 'Home & Storage', 'Collectibles',
];

const rawProducts = [
  // Home Decor
  { id:  1, name: 'Ceramic Flower Vase',     category: 'Home Decor',       price: 24.99, rating: 4.8, reviews: 142, material: 'Ceramic',   color: 'White',    image: img('photo-1631125915902-d8abe9225ff2') },
  { id:  2, name: 'Luxury Scented Candle',   category: 'Home Decor',       price: 18.99, rating: 4.9, reviews: 311, material: 'Soy Wax',   color: 'Gold',     image: img('photo-1602607203588-d6d0eda790e3') },
  { id:  3, name: 'Hexagonal Mirror Set',    category: 'Home Decor',       price: 39.99, rating: 4.7, reviews:  98, material: 'Glass',     color: 'Silver',   image: img('photo-1688650963441-a4ce8fa08d50') },
  { id:  4, name: 'Hand-Painted Bowl',       category: 'Home Decor',       price: 27.99, rating: 4.8, reviews: 134, material: 'Ceramic',   color: 'Teal',     image: img('photo-1635847420907-407d08eaa945') },

  // Toys & Games
  { id:  5, name: 'Plush Dragon Toy',        category: 'Toys & Games',     price: 22.99, rating: 4.9, reviews: 487, material: 'Plush',     color: 'Orange',   image: img('photo-1591926828257-2eefb8aa42fa') },
  { id:  6, name: 'Speed Puzzle Cube',       category: 'Toys & Games',     price: 12.99, rating: 4.6, reviews: 634, material: 'ABS',       color: 'Blue',     image: img('photo-1597914377769-db5167cb0221') },
  { id:  7, name: 'Jump Rope Set',           category: 'Toys & Games',     price: 16.99, rating: 4.7, reviews: 345, material: 'Nylon',     color: 'Green',    image: img('photo-1595909315417-2edd382a56dc') },
  { id:  8, name: 'Wooden Spinning Top',     category: 'Toys & Games',     price:  9.99, rating: 4.5, reviews: 289, material: 'Wood',      color: 'Brown',    image: img('photo-1714618888538-8d15a9228236') },

  // Tools & Gadgets
  { id:  9, name: 'Desktop Cable Box',       category: 'Tools & Gadgets',  price: 14.99, rating: 4.7, reviews: 412, material: 'ABS',       color: 'Black',    image: img('photo-1644463589256-02679b9c0767') },
  { id: 10, name: 'Aluminium Phone Stand',   category: 'Tools & Gadgets',  price: 16.99, rating: 4.8, reviews: 287, material: 'Aluminium', color: 'Silver',   image: img('photo-1496128858413-b36217c2ce36') },
  { id: 11, name: 'Canvas Tool Roll',        category: 'Tools & Gadgets',  price: 11.99, rating: 4.6, reviews: 198, material: 'Canvas',    color: 'Brown',    image: img('photo-1505753255122-ecb7f694d6c4') },
  { id: 12, name: 'Mechanical Gear Clock',   category: 'Tools & Gadgets',  price: 29.99, rating: 4.8, reviews: 156, material: 'Metal',     color: 'Gold',     image: img('photo-1583198432859-635beb4e8600') },

  // Art & Sculptures
  { id: 13, name: 'Crystal Glass Vase',      category: 'Art & Sculptures', price: 42.99, rating: 4.8, reviews:  89, material: 'Glass',     color: 'White',    image: img('photo-1597696929736-6d13bed8e6a8') },
  { id: 14, name: 'Ceramic Owl Figurine',    category: 'Art & Sculptures', price: 34.99, rating: 4.7, reviews: 134, material: 'Ceramic',   color: 'Brown',    image: img('photo-1637666505754-7416ebd70cbf') },
  { id: 15, name: 'Eiffel Tower Replica',    category: 'Art & Sculptures', price: 38.99, rating: 4.9, reviews:  78, material: 'Metal',     color: 'Silver',   image: img('photo-1625842749358-5f0de7796b6c') },
  { id: 16, name: 'Classical Marble Bust',   category: 'Art & Sculptures', price: 54.99, rating: 4.6, reviews:  56, material: 'Resin',     color: 'White',    image: img('photo-1563301323-094e5843a962') },

  // Jewelry
  { id: 17, name: 'Faceted Gold Ring',       category: 'Jewelry',          price: 22.99, rating: 4.7, reviews: 134, material: 'Gold',      color: 'Gold',     image: img('photo-1589128777073-263566ae5e4d') },
  { id: 18, name: 'Crescent Moon Earrings',  category: 'Jewelry',          price: 14.99, rating: 4.9, reviews: 367, material: 'Silver',    color: 'Silver',   image: img('photo-1599643477877-530eb83abc8e') },
  { id: 19, name: 'Star Map Pendant',        category: 'Jewelry',          price: 19.99, rating: 4.8, reviews: 223, material: 'Gold',      color: 'Gold',     image: img('photo-1506630448388-4e683c67ddb0') },
  { id: 20, name: 'Filigree Bangle',         category: 'Jewelry',          price: 28.99, rating: 4.7, reviews: 167, material: 'Rose Gold', color: 'Rose Gold',image: img('photo-1611583027838-515a1087afdb') },

  // Home & Storage
  { id: 21, name: 'Floating Wall Shelf',     category: 'Home & Storage',   price: 12.99, rating: 4.6, reviews: 334, material: 'Wood',      color: 'Brown',    image: img('photo-1593085260707-5377ba37f868') },
  { id: 22, name: 'Silicone Cable Clips',    category: 'Home & Storage',   price:  8.99, rating: 4.7, reviews: 456, material: 'Silicone',  color: 'Gray',     image: img('photo-1615559130605-bb46b0af4dc7') },
  { id: 23, name: 'Coat Hook Rail',          category: 'Home & Storage',   price: 15.99, rating: 4.8, reviews: 289, material: 'Metal',     color: 'Silver',   image: img('photo-1504823787925-0abb85d5d7b2') },
  { id: 24, name: 'Corner Shelf Bracket',    category: 'Home & Storage',   price: 10.99, rating: 4.5, reviews: 234, material: 'Steel',     color: 'Silver',   image: img('photo-1581096316934-51283c9851ac') },

  // Collectibles
  { id: 25, name: 'Fantasy Wizard Figurine', category: 'Collectibles',     price: 18.99, rating: 4.9, reviews: 312, material: 'Resin',     color: 'Purple',   image: img('photo-1776426275153-55cd6f8dc995') },
  { id: 26, name: 'Knight Armor Figurine',   category: 'Collectibles',     price: 24.99, rating: 4.8, reviews: 198, material: 'Resin',     color: 'Silver',   image: img('photo-1776426278443-3c2b7b09cbbd') },
  { id: 27, name: 'Archer Figurine',         category: 'Collectibles',     price: 21.99, rating: 4.7, reviews: 145, material: 'Resin',     color: 'Brown',    image: img('photo-1776426300297-bd0c0fdac9b6') },
  { id: 28, name: 'Viking Warrior Figurine', category: 'Collectibles',     price: 19.99, rating: 4.6, reviews: 267, material: 'Resin',     color: 'Red',      image: img('photo-1776426293279-17b65564ade7') },

  // Extras
  { id: 29, name: 'Ceramic Fox Figurine',    category: 'Art & Sculptures', price: 31.99, rating: 4.9, reviews: 204, material: 'Ceramic',   color: 'Orange',   image: img('photo-1595154591160-75dc6623945f') },
  { id: 30, name: 'Plush Octopus Toy',       category: 'Toys & Games',     price: 19.99, rating: 4.8, reviews: 388, material: 'Plush',     color: 'Teal',     image: img('photo-1538292999061-16ca3647ab1c') },
];

export const products = rawProducts.map((p) => ({
  ...p,
  badge: p.rating >= 4.8
    ? (p.reviews > 300 ? 'Bestseller' : 'Top Rated')
    : p.price < 10 ? 'Best Value' : null,
}));

export { categories };
