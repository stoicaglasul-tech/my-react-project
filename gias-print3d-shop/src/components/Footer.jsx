import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';
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
          <div className="footer-socials">
            <a href="#" aria-label="GitHub"><FiGithub /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
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
            <h4>Info</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <a href="#">Shipping Policy</a>
            <a href="#">Returns</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Gia's Print 3D Shop. Made with React.</p>
      </div>
    </footer>
  );
}
