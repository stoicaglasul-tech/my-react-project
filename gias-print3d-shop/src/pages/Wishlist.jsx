import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Wishlist.css';

export default function Wishlist() {
  const { wishlist, dispatch } = useApp();

  const moveToCart = item => {
    dispatch({ type: 'CART_ADD', payload: item });
    dispatch({ type: 'WISH_REMOVE', payload: item.id });
  };

  if (wishlist.length === 0) return (
    <div className="container">
      <div className="empty-state" style={{ minHeight: '60vh' }}>
        <div className="icon">💜</div>
        <h3>Your wishlist is empty</h3>
        <p>Save items you love so you can find them later!</p>
        <Link to="/shop" className="btn btn-primary btn-lg"><FiHeart /> Discover Products</Link>
      </div>
    </div>
  );

  return (
    <div className="wishlist-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="section-title">My Wishlist</h1>
          <p className="section-sub">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div key={item.id} className="wish-card">
              <Link to={`/product/${item.id}`} className="wish-img">
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="wish-body">
                <p className="wish-cat">{item.category}</p>
                <Link to={`/product/${item.id}`} className="wish-name">{item.name}</Link>
                <p className="wish-price">${item.price.toFixed(2)}</p>
                <div className="wish-actions">
                  <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => moveToCart(item)}>
                    <FiShoppingCart /> Add to Cart
                  </button>
                  <button className="btn btn-outline" onClick={() => dispatch({ type: 'WISH_REMOVE', payload: item.id })}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            className="btn btn-primary"
            onClick={() => wishlist.forEach(item => dispatch({ type: 'CART_ADD', payload: item }))}
          >
            <FiShoppingCart /> Add All to Cart
          </button>
          <Link to="/shop" className="btn btn-outline">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
