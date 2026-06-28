import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Cart.css';

export default function Cart() {
  const { cart, cartTotal, dispatch } = useApp();
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div className="container">
      <div className="empty-state" style={{ minHeight: '60vh' }}>
        <div className="icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some amazing 3D printed objects to get started!</p>
        <Link to="/shop" className="btn btn-primary btn-lg"><FiShoppingCart /> Start Shopping</Link>
      </div>
    </div>
  );

  const shipping = cartTotal >= 50 ? 0 : 6.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <div className="cart-page">
      <div className="page-hero"><div className="container"><h1 className="section-title">Shopping Cart</h1><p className="section-sub">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p></div></div>
      <div className="container cart-layout">
        {/* Items */}
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`} className="cart-item-img">
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="cart-item-info">
                <p className="cart-item-cat">{item.category}</p>
                <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                <p className="cart-item-meta">Material: {item.material} · Color: {item.color}</p>
              </div>
              <div className="cart-item-controls">
                <div className="qty-control">
                  <button onClick={() => dispatch({ type: 'CART_UPDATE_QTY', payload: { id: item.id, qty: Math.max(1, item.qty - 1) } })}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => dispatch({ type: 'CART_UPDATE_QTY', payload: { id: item.id, qty: item.qty + 1 } })}>+</button>
                </div>
                <p className="cart-item-price">${(item.price * item.qty).toFixed(2)}</p>
                <button className="btn btn-ghost remove-btn" onClick={() => dispatch({ type: 'CART_REMOVE', payload: item.id })}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
          <button className="btn btn-ghost clear-cart" onClick={() => dispatch({ type: 'CART_CLEAR' })}>
            <FiTrash2 /> Clear Cart
          </button>
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-rows">
            <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span style={{ color: 'var(--accent)' }}>Free</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
          </div>
          {shipping > 0 && (
            <p className="free-ship-msg">Add ${(50 - cartTotal).toFixed(2)} more for free shipping!</p>
          )}
          <div className="summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => navigate('/checkout')}>
            Checkout <FiArrowRight />
          </button>
          <Link to="/shop" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            Continue Shopping
          </Link>
          <div className="cart-trust">
            <p>🔒 Secure checkout</p>
            <p>🚚 Ships in 2–4 days</p>
            <p>↩️ 30-day returns</p>
          </div>
        </div>
      </div>
    </div>
  );
}
