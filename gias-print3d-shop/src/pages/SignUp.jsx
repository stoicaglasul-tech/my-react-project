import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Auth.css';

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const submit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    setTimeout(() => {
      const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
      if (accounts.find(a => a.email === form.email)) {
        setErrors({ email: 'Email already registered' });
        setLoading(false);
        return;
      }
      const newUser = { name: form.name, email: form.email, password: form.password };
      localStorage.setItem('accounts', JSON.stringify([...accounts, newUser]));
      dispatch({ type: 'SIGN_IN', payload: { name: form.name, email: form.email } });
      navigate('/');
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">🖨️ Print<span>3D</span></Link>
          <h1>Create account</h1>
          <p>Join thousands of 3D printing fans</p>
        </div>

        <form onSubmit={submit} className="auth-form">
          <div className="field">
            <label>Full Name</label>
            <div className="input-icon">
              <FiUser />
              <input className="input" type="text" name="name" placeholder="Jane Doe" value={form.name} onChange={handleChange} />
            </div>
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>
          <div className="field">
            <label>Email</label>
            <div className="input-icon">
              <FiMail />
              <input className="input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} autoComplete="email" />
            </div>
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>
          <div className="field">
            <label>Password</label>
            <div className="input-icon">
              <FiLock />
              <input className="input" type={showPw ? 'text' : 'password'} name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} />
              <button type="button" className="pw-toggle" onClick={() => setShowPw(s => !s)}>{showPw ? <FiEyeOff /> : <FiEye />}</button>
            </div>
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <div className="input-icon">
              <FiLock />
              <input className="input" type={showPw ? 'text' : 'password'} name="confirm" placeholder="Repeat password" value={form.confirm} onChange={handleChange} />
            </div>
            {errors.confirm && <p className="field-error">{errors.confirm}</p>}
          </div>
          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/signin">Sign in</Link></p>
      </div>
    </div>
  );
}
