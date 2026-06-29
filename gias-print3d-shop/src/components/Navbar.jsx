import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser, FiLogOut, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { user, cartCount, wishlist, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (search.trim()) { navigate(`/shop?q=${encodeURIComponent(search.trim())}`); setSearch(''); setOpen(false); }
  };

  const signOut = () => { dispatch({ type: 'SIGN_OUT' }); navigate('/'); };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🖨️</span>
          <span className="logo-text">Gia's Print<span>3D</span></span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <FiSearch />
          <input
            className="input"
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>

        <div className={`navbar-links${open ? ' open' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/shop" className="nav-link" onClick={() => setOpen(false)}>Shop</NavLink>

          <div className="nav-actions">
            <Link to="/wishlist" className="nav-icon-btn" title="Wishlist" onClick={() => setOpen(false)}>
              <FiHeart />
              {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className={`nav-icon-btn nav-cart-btn${cartCount > 0 ? ' has-items' : ''}`} title="Cart" onClick={() => setOpen(false)}>
              <FiShoppingCart />
              {cartCount > 0 && <span className="nav-badge nav-badge-cart">{cartCount}</span>}
            </Link>
            {user ? (
              <div className="nav-user">
                <span className="nav-user-name">{user.name.split(' ')[0]}</span>
                <button className="nav-icon-btn" onClick={signOut} title="Sign out"><FiLogOut /></button>
              </div>
            ) : (
              <Link to="/signin" className="btn btn-primary" onClick={() => setOpen(false)}>
                <FiUser /> Sign In
              </Link>
            )}
          </div>
        </div>

        <button className="hamburger" onClick={() => setOpen(o => !o)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
}
