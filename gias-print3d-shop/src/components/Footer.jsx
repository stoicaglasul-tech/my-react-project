import { Link } from 'react-router-dom';
import { FiGithub, FiInstagram, FiMail } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-text" style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.2rem' }}>
            🖨️ Gia's Print<span style={{ color: 'var(--primary)' }}>3D</span>
          </span>
          <p>Premium 3D printed objects crafted with care. From art to utility — we print it all.</p>
          <p className="footer-about">
            A front-end development project built with React, Vite and React Router. No account needed to browse and shop — just add to cart and check out.
          </p>
          <div className="footer-socials">
            <a href="https://github.com/stoicaglasul-tech/my-react-project" aria-label="GitHub" target="_blank" rel="noreferrer"><FiGithub /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="mailto:gia.stoica.office@gmail.com" aria-label="Email"><FiMail /></a>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Shop</h4>
            <Link to="/shop">All Products</Link>
            <Link to="/shop?cat=Home+Decor">Home Decor</Link>
            <Link to="/shop?cat=Toys+%26+Games">Toys & Games</Link>
            <Link to="/shop?cat=Art+%26+Sculptures">Art & Sculptures</Link>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Create Account</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/wishlist">Wishlist</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:gia.stoica.office@gmail.com">gia.stoica.office@gmail.com</a>
            <span className="footer-note">Orders ship within 3–5 business days.</span>
            <span className="footer-note">Returns accepted within 14 days.</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Gia's Print 3D Shop. Built with React &amp; Vite.</p>
      </div>
    </footer>
  );
}
