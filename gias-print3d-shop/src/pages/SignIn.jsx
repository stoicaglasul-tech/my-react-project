import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Auth.css';

const DEMO = { email: 'gia@print3d.com', password: 'demo1234' };
export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }

    setLoading(true);
    setTimeout(() => {
      const saved = JSON.parse(localStorage.getItem('accounts') || '[]');
      const account = saved.find(a => a.email === form.email && a.password === form.password);
      const isDemo = form.email === DEMO.email && form.password === DEMO.password;

      if (account || isDemo) {
        dispatch({ type: 'SIGN_IN', payload: account || { name: 'Gia Stoica', email: DEMO.email } });
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">🖨️ Gia's Print<span>3D</span></Link>
          <h1>Welcome back</h1>
          <p>{from !== '/' ? 'Sign in to continue to your cart' : 'Sign in to your account'}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={submit} className="auth-form">
          <div className="field">
            <label>Email</label>
            <div className="input-icon">
              <FiMail />
              <input className="input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} autoComplete="email" />
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="input-icon">
              <FiLock />
              <input className="input" type={showPw ? 'text' : 'password'} name="password" placeholder="••••••••" value={form.password} onChange={handleChange} autoComplete="current-password" />
              <button type="button" className="pw-toggle" onClick={() => setShowPw(s => !s)}>{showPw ? <FiEyeOff /> : <FiEye />}</button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}
