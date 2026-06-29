import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiCheck, FiEye } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { wishlist, dispatch } = useApp();
  const inWish = wishlist.some(i => i.id === product.id);
  const [added, setAdded] = useState(false);

  const addToCart = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'CART_ADD', payload: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  const toggleWish = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'WISH_TOGGLE', payload: product });
  };

  const stars = Array.from({ length: 5 }, (_, i) =>
    i < Math.floor(product.rating) ? '★' : i < product.rating ? '½' : '☆'
  ).join('');

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="card-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        <div className="card-overlay">
          <button className="overlay-btn" title="Quick view"><FiEye /></button>
          <button className={`overlay-btn wish${inWish ? ' active' : ''}`} onClick={toggleWish} title="Wishlist">
            <FiHeart />
          </button>
        </div>
        {product.badge && (
          <span className={`card-badge badge badge-${product.badge.toLowerCase().replace(' ', '')}`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="card-body">
        <p className="card-category">{product.category}</p>
        <h3 className="card-name">{product.name}</h3>
        <div className="card-meta">
          <span className="stars" title={`${product.rating} / 5`}>
            {stars} <span>({product.reviews})</span>
          </span>
        </div>
        <div className="card-footer">
          <span className="card-price">${product.price.toFixed(2)}</span>
          <button className={`btn card-cart-btn${added ? ' btn-added' : ' btn-primary'}`} onClick={addToCart}>
            {added ? <><FiCheck /> Added!</> : <><FiShoppingCart /> Add</>}
          </button>
        </div>
      </div>
    </Link>
  );
}
