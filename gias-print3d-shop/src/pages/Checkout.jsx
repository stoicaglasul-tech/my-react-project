import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiCreditCard, FiTruck, FiCheck } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Checkout.css';

const STEPS = ['Shipping', 'Payment', 'Review'];

const empty = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '', country: 'US',
  cardName: '', cardNumber: '', expiry: '', cvv: '',
};

const DEMO_DATA = {
  firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone: '+1 555 010 0100',
  address: '123 Main Street, Apt 4B', city: 'New York', state: 'NY', zip: '10001', country: 'US',
  cardName: 'JANE DOE', cardNumber: '4242 4242 4242 4242', expiry: '12/27', cvv: '123',
};

function formatCard(val) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(val) {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits;
}

export default function Checkout() {
  const { cart, cartTotal, user, dispatch } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ ...empty, email: user?.email || '', firstName: user?.name?.split(' ')[0] || '', lastName: user?.name?.split(' ')[1] || '' });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const shipping = cartTotal >= 50 ? 0 : 6.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  if (cart.length === 0) return (
    <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
      <h2>Your cart is empty</h2>
      <Link to="/shop" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Go Shopping</Link>
    </div>
  );

  const set = (field, val) => { setForm(f => ({ ...f, [field]: val })); setErrors(e => ({ ...e, [field]: '' })); };

  const validateShipping = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state.trim()) e.state = 'Required';
    if (form.zip.replace(/\D/g, '').length < 4) e.zip = 'Valid ZIP required';
    return e;
  };

  const validatePayment = () => {
    const e = {};
    if (!form.cardName.trim()) e.cardName = 'Required';
    if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter 16-digit card number';
    if (form.expiry.length < 5) e.expiry = 'Enter MM/YY';
    if (form.cvv.replace(/\D/g, '').length < 3) e.cvv = 'Enter 3-digit CVV';
    return e;
  };

  const next = () => {
    const errs = step === 0 ? validateShipping() : step === 1 ? validatePayment() : {};
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  const [payStage, setPayStage] = useState(null); // null | 'processing' | 'success' | 'declined'

  const placeOrder = () => {
    setPlacing(true);
    setPayStage('processing');
    // Simulate ~2s processing, then 90% success / 10% decline
    setTimeout(() => {
      const success = Math.random() > 0.1;
      if (success) {
        setPayStage('success');
        setTimeout(() => {
          const order = {
            id: 'ORD-' + Date.now(),
            date: new Date().toLocaleDateString(),
            items: [...cart],
            total,
            shipping: form,
          };
          const orders = JSON.parse(localStorage.getItem('orders') || '[]');
          localStorage.setItem('orders', JSON.stringify([...orders, order]));
          dispatch({ type: 'CART_CLEAR' });
          navigate('/order-confirmation', { state: { order } });
        }, 1800);
      } else {
        setPayStage('declined');
        setPlacing(false);
      }
    }, 2200);
  };

  const Field = ({ label, name, type = 'text', placeholder, format }) => (
    <div className="co-field">
      <label>{label}</label>
      <input
        className={`input${errors[name] ? ' input-error' : ''}`}
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={e => set(name, format ? format(e.target.value) : e.target.value)}
      />
      {errors[name] && <span className="field-error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="checkout-page">
      <div className="co-topbar">
        <div className="container co-topbar-inner">
          <Link to="/cart" className="btn btn-ghost"><FiArrowLeft /> Back to Cart</Link>
          <span className="co-logo">🖨️ Gia's Print<span>3D</span></span>
          <span className="co-secure"><FiLock /> Secure Checkout</span>
        </div>
      </div>

      <div className="container co-layout">
        <div className="co-main">
          {/* Steps */}
          <div className="co-steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`co-step${i === step ? ' active' : i < step ? ' done' : ''}`}>
                <span className="co-step-num">{i < step ? <FiCheck /> : i + 1}</span>
                <span>{s}</span>
                {i < STEPS.length - 1 && <div className="co-step-line" />}
              </div>
            ))}
          </div>

          {/* Step 0: Shipping */}
          {step === 0 && (
            <div className="co-section">
              <div className="co-section-header">
                <h2><FiTruck /> Shipping Information</h2>
                <button className="btn btn-ghost autofill-btn" onClick={() => { setForm(f => ({ ...f, ...DEMO_DATA })); setErrors({}); }}>⚡ Autofill demo</button>
              </div>
              <div className="co-grid-2">
                <Field label="First Name" name="firstName" placeholder="Jane" />
                <Field label="Last Name" name="lastName" placeholder="Doe" />
              </div>
              <div className="co-grid-2">
                <Field label="Email" name="email" type="email" placeholder="jane@example.com" />
                <Field label="Phone" name="phone" type="tel" placeholder="+1 555 0100" />
              </div>
              <Field label="Street Address" name="address" placeholder="123 Main St, Apt 4B" />
              <div className="co-grid-3">
                <Field label="City" name="city" placeholder="New York" />
                <Field label="State / Province" name="state" placeholder="NY" />
                <Field label="ZIP / Postal Code" name="zip" placeholder="10001" />
              </div>
              <div className="co-field">
                <label>Country</label>
                <select className="input" value={form.country} onChange={e => set('country', e.target.value)}>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="RO">Romania</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button className="btn btn-primary btn-lg co-next" onClick={next}>
                Continue to Payment →
              </button>
            </div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <div className="co-section">
              <div className="co-section-header">
                <h2><FiCreditCard /> Payment Details</h2>
                <button className="btn btn-ghost autofill-btn" onClick={() => { setForm(f => ({ ...f, cardName: DEMO_DATA.cardName, cardNumber: DEMO_DATA.cardNumber, expiry: DEMO_DATA.expiry, cvv: DEMO_DATA.cvv })); setErrors({}); }}>⚡ Autofill demo</button>
              </div>
              <div className="card-preview">
                <div className="card-preview-chip" />
                <div className="card-preview-number">{form.cardNumber || '•••• •••• •••• ••••'}</div>
                <div className="card-preview-row">
                  <span>{form.cardName || 'CARDHOLDER NAME'}</span>
                  <span>{form.expiry || 'MM/YY'}</span>
                </div>
              </div>
              <Field label="Name on Card" name="cardName" placeholder="Jane Doe" />
              <Field label="Card Number" name="cardNumber" placeholder="1234 5678 9012 3456" format={formatCard} />
              <div className="co-grid-2">
                <Field label="Expiry (MM/YY)" name="expiry" placeholder="08/27" format={formatExpiry} />
                <Field label="CVV" name="cvv" placeholder="•••" format={v => v.replace(/\D/g, '').slice(0, 4)} />
              </div>
              <p className="co-note"><FiLock /> Your payment info is encrypted and never stored.</p>
              <div className="co-btn-row">
                <button className="btn btn-outline" onClick={() => setStep(0)}> ← Back</button>
                <button className="btn btn-primary btn-lg" onClick={next}>Review Order →</button>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="co-section">
              <h2>Review Your Order</h2>
              <div className="review-block">
                <h4>Shipping to</h4>
                <p>{form.firstName} {form.lastName}</p>
                <p>{form.address}, {form.city}, {form.state} {form.zip}</p>
                <p>{form.email} · {form.phone}</p>
                <button className="btn btn-ghost co-edit" onClick={() => setStep(0)}>Edit</button>
              </div>
              <div className="review-block">
                <h4>Payment</h4>
                <p>•••• •••• •••• {form.cardNumber.replace(/\s/g, '').slice(-4)}</p>
                <p>Expires {form.expiry}</p>
                <button className="btn btn-ghost co-edit" onClick={() => setStep(1)}>Edit</button>
              </div>
              <div className="review-items">
                <h4>Items ({cart.length})</h4>
                {cart.map(item => (
                  <div key={item.id} className="review-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p className="review-item-meta">Qty: {item.qty} · {item.material} · {item.color}</p>
                    </div>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="co-btn-row">
                <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button className="btn btn-primary btn-lg place-btn" onClick={placeOrder} disabled={placing}>
                  {placing ? <><span className="spinner" /> Placing Order…</> : `Place Order · $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Payment popup */}
        {payStage && (
          <div className="pay-overlay">
            <div className="pay-modal">
              {payStage === 'processing' && (
                <>
                  <div className="pay-spinner-ring" />
                  <h3>Processing Payment</h3>
                  <p>Please wait while we securely process your card…</p>
                  <div className="pay-progress"><div className="pay-progress-bar" /></div>
                </>
              )}
              {payStage === 'success' && (
                <>
                  <div className="pay-icon pay-icon--success">✓</div>
                  <h3>Payment Approved!</h3>
                  <p>Your order has been placed. Redirecting to confirmation…</p>
                </>
              )}
              {payStage === 'declined' && (
                <>
                  <div className="pay-icon pay-icon--fail">✕</div>
                  <h3>Payment Declined</h3>
                  <p>Your card was declined. Please check your details and try again.</p>
                  <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => { setPayStage(null); setStep(1); }}>
                    Try Again
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Order summary sidebar */}
        <aside className="co-summary">
          <h3>Order Summary</h3>
          <div className="co-summary-items">
            {cart.map(item => (
              <div key={item.id} className="co-summary-item">
                <div className="co-summary-img-wrap">
                  <img src={item.image} alt={item.name} />
                  <span className="co-qty-badge">{item.qty}</span>
                </div>
                <span className="co-summary-name">{item.name}</span>
                <span className="co-summary-price">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="co-summary-rows">
            <div className="co-summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
            <div className="co-summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="co-summary-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
          </div>
          <div className="co-summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </aside>
      </div>
    </div>
  );
}
