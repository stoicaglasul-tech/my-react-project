import { useLocation, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiHome, FiShoppingBag } from 'react-icons/fi';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return (
    <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
      <h2>No order found</h2>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Go Home</Link>
    </div>
  );

  return (
    <div className="confirm-page">
      <div className="container confirm-inner">
        <div className="confirm-hero">
          <div className="confirm-icon"><FiCheckCircle /></div>
          <h1>Order Placed!</h1>
          <p>Thank you, <strong>{order.shipping.firstName}</strong>! Your order has been confirmed.</p>
          <div className="confirm-id">Order ID: <span>{order.id}</span></div>
        </div>

        <div className="confirm-grid">
          {/* Shipping */}
          <div className="confirm-card">
            <h3><FiPackage /> Shipping Details</h3>
            <p>{order.shipping.firstName} {order.shipping.lastName}</p>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
            <p>{order.shipping.email}</p>
            <div className="confirm-badge">Estimated delivery: 3–6 business days</div>
          </div>

          {/* Items */}
          <div className="confirm-card">
            <h3>Items Ordered ({order.items.length})</h3>
            <div className="confirm-items">
              {order.items.map(item => (
                <div key={item.id} className="confirm-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={e => { e.target.src = `https://picsum.photos/seed/${item.id}/56/56`; }}
                  />
                  <div>
                    <p>{item.name}</p>
                    <p className="confirm-item-meta">Qty: {item.qty} · ${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="confirm-card confirm-totals">
            <h3>Order Total</h3>
            <div className="confirm-rows">
              <div className="confirm-row"><span>Subtotal</span><span>${(order.total - (order.total >= 50 ? 0 : 6.99) - order.total * 0.08 / 1.08 * 0.08).toFixed(2)}</span></div>
              <div className="confirm-row"><span>Shipping</span><span>{order.total >= 50 ? 'Free' : '$6.99'}</span></div>
              <div className="confirm-row"><span>Tax</span><span>${(order.total * 0.08 / 1.08).toFixed(2)}</span></div>
            </div>
            <div className="confirm-total"><span>Total Paid</span><span>${order.total.toFixed(2)}</span></div>
          </div>
        </div>

        <div className="confirm-actions">
          <Link to="/" className="btn btn-outline btn-lg"><FiHome /> Back to Home</Link>
          <Link to="/shop" className="btn btn-primary btn-lg"><FiShoppingBag /> Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
