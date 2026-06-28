import { Link } from 'react-router-dom';
import { FiArrowRight, FiPackage, FiTruck, FiRefreshCw, FiStar } from 'react-icons/fi';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const featured = products.filter(p => p.badge === 'Bestseller' || p.rating >= 4.9).slice(0, 8);
const newArrivals = [...products].sort((a, b) => b.id - a.id).slice(0, 8);

const perks = [
  { icon: <FiPackage />, title: 'Quality Printed', desc: 'Industrial-grade filaments & precision printing' },
  { icon: <FiTruck />, title: 'Fast Shipping', desc: 'Dispatched within 2–3 business days' },
  { icon: <FiRefreshCw />, title: '30-Day Returns', desc: 'Not satisfied? Easy hassle-free returns' },
  { icon: <FiStar />, title: '4.7★ Average', desc: 'Thousands of happy customers worldwide' },
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-grid" />
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="hero-tag">🖨️ Over 100 Products</span>
            <h1 className="hero-title">
              The Future of <br />
              <span className="gradient-text">3D Printed</span> Objects
            </h1>
            <p className="hero-sub">
              Explore our curated collection of precision-crafted 3D printed pieces — from stunning art to everyday utility.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary btn-lg">
                Shop Now <FiArrowRight />
              </Link>
              <Link to="/shop?cat=Art+%26+Sculptures" className="btn btn-outline btn-lg">
                Browse Art
              </Link>
            </div>
            <div className="hero-stats">
              <div><strong>108+</strong><span>Products</span></div>
              <div><strong>10</strong><span>Categories</span></div>
              <div><strong>4.7★</strong><span>Rating</span></div>
            </div>
          </div>
          <div className="hero-cards">
            {products.slice(0, 3).map(p => (
              <div key={p.id} className="hero-card">
                <img src={p.image} alt={p.name} onError={e => { e.target.src = `https://picsum.photos/seed/${p.id}/200/200`; }} />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="perks">
        <div className="container perks-grid">
          {perks.map(perk => (
            <div key={perk.title} className="perk-item">
              <span className="perk-icon">{perk.icon}</span>
              <div>
                <h4>{perk.title}</h4>
                <p>{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-sub">10 categories — something for everyone</p>
          <div className="categories-grid">
            {categories.map(cat => {
              const catProduct = products.find(p => p.category === cat);
              return (
                <Link key={cat} to={`/shop?cat=${encodeURIComponent(cat)}`} className="cat-card">
                  <img src={catProduct?.image} alt={cat} onError={e => { e.target.src = `https://picsum.photos/seed/${cat}/200/200`; }} />
                  <div className="cat-overlay" />
                  <span className="cat-name">{cat}</span>
                  <span className="cat-count">{products.filter(p => p.category === cat).length} items</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Bestsellers</h2>
              <p className="section-sub">Our most loved creations</p>
            </div>
            <Link to="/shop" className="btn btn-outline">View All <FiArrowRight /></Link>
          </div>
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="promo-banner">
        <div className="container promo-inner">
          <div>
            <h2>New to 3D printing?</h2>
            <p>We handle everything — design, materials, finishing. You just enjoy the result.</p>
          </div>
          <Link to="/shop" className="btn btn-primary btn-lg">Explore Collection <FiArrowRight /></Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-sub">Fresh off the print bed</p>
            </div>
            <Link to="/shop" className="btn btn-outline">See More <FiArrowRight /></Link>
          </div>
          <div className="products-grid">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
