import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiArrowLeft, FiShare2, FiCheck } from 'react-icons/fi';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === +id);
  const { wishlist, dispatch } = useApp();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  if (!product) return (
    <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
      <h2>Product not found</h2>
      <Link to="/shop" className="btn btn-primary" style={{ marginTop: 16 }}>Back to Shop</Link>
    </div>
  );

  const inWish = wishlist.some(i => i.id === product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const addToCart = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'CART_ADD', payload: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stars = n => Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < Math.floor(n) ? '#ffd700' : '#444' }}>★</span>
  ));

  return (
    <div className="product-detail">
      <div className="container">
        <div className="detail-breadcrumb">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}><FiArrowLeft /> Back</button>
          <span className="bc-sep">/</span>
          <Link to="/shop">Shop</Link>
          <span className="bc-sep">/</span>
          <Link to={`/shop?cat=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <span className="bc-sep">/</span>
          <span>{product.name}</span>
        </div>

        <div className="detail-grid">
          {/* Image */}
          <div className="detail-image-wrap">
            <img
              src={product.image}
              alt={product.name}
            />
            {product.badge && (
              <span className={`card-badge badge badge-${product.badge.toLowerCase().replace(' ', '')}`} style={{ position: 'absolute', top: 16, left: 16 }}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            <p className="detail-cat">{product.category}</p>
            <h1 className="detail-name">{product.name}</h1>

            <div className="detail-rating">
              <div className="stars">{stars(product.rating)} <span>{product.rating} ({product.reviews} reviews)</span></div>
            </div>

            <div className="detail-price">${product.price.toFixed(2)}</div>

            <div className="detail-specs">
              <div className="spec-row"><span>Material</span><strong>{product.material}</strong></div>
              <div className="spec-row"><span>Color</span><strong>{product.color}</strong></div>
              <div className="spec-row"><span>Category</span><strong>{product.category}</strong></div>
              <div className="spec-row"><span>Lead Time</span><strong>2–4 business days</strong></div>
              <div className="spec-row"><span>Layer Height</span><strong>0.2mm</strong></div>
              <div className="spec-row"><span>Infill</span><strong>20% gyroid</strong></div>
            </div>

            <div className="detail-qty">
              <span>Quantity</span>
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            <div className="detail-actions">
              <button className={`btn btn-primary btn-lg flex-1${added ? ' added' : ''}`} onClick={addToCart}>
                {added ? <><FiCheck /> Added!</> : <><FiShoppingCart /> Add to Cart</>}
              </button>
              <button
                className={`btn btn-outline detail-wish${inWish ? ' active' : ''}`}
                onClick={() => dispatch({ type: 'WISH_TOGGLE', payload: product })}
                title="Wishlist"
              >
                <FiHeart />
              </button>
              <button className="btn btn-outline" title="Share"><FiShare2 /></button>
            </div>

            <div className="detail-features">
              <div className="feature"><span>✅</span> Eco-friendly PLA/PETG filaments</div>
              <div className="feature"><span>✅</span> Precision FDM printing at 0.2mm layers</div>
              <div className="feature"><span>✅</span> Post-processed & quality checked</div>
              <div className="feature"><span>✅</span> 30-day return policy</div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="detail-related">
            <h2 className="section-title">More from {product.category}</h2>
            <div className="products-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
