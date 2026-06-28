import { useState } from 'react';
import { FiMail, FiMapPin, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';
import './Contact.css';

const info = [
  { icon: <FiMail />, label: 'Email', value: 'gia@print3d.com' },
  { icon: <FiMapPin />, label: 'Location', value: 'Arad, Romania — ships worldwide' },
  { icon: <FiClock />, label: 'Support hours', value: 'Mon – Fri, 9 am – 6 pm EET' },
];

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())               e.name    = 'Name is required';
    if (!form.email.includes('@'))       e.email   = 'Valid email required';
    if (!form.subject.trim())            e.subject = 'Subject is required';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 900);
  };

  return (
    <div className="contact-page">

      {/* Header */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-eyebrow">Get in touch</p>
          <h1 className="contact-title">We'd love to hear from you</h1>
          <p className="contact-sub">Questions, custom orders, or just want to say hi — we reply within one business day.</p>
        </div>
      </section>

      {/* Body */}
      <section className="contact-body">
        <div className="container contact-grid">

          {/* Info column */}
          <div className="contact-info">
            <h2>Contact information</h2>
            <div className="info-cards">
              {info.map(i => (
                <div key={i.label} className="info-card">
                  <div className="info-icon">{i.icon}</div>
                  <div>
                    <p className="info-label">{i.label}</p>
                    <p className="info-value">{i.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-note">
              <p>For <strong>custom print requests</strong>, please include dimensions, material preference, and any reference images in your message.</p>
            </div>
          </div>

          {/* Form column */}
          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-success">
                <FiCheckCircle className="success-icon" />
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. We'll get back to you within one business day.</p>
                <button className="btn btn-outline" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your name</label>
                    <input
                      name="name"
                      className={`input${errors.name ? ' input-error' : ''}`}
                      placeholder="Alex Example"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p className="field-error">{errors.name}</p>}
                  </div>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      name="email"
                      type="email"
                      className={`input${errors.email ? ' input-error' : ''}`}
                      placeholder="alex@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="field-error">{errors.email}</p>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    name="subject"
                    className={`input${errors.subject ? ' input-error' : ''}`}
                    placeholder="Custom order inquiry"
                    value={form.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && <p className="field-error">{errors.subject}</p>}
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    className={`input textarea${errors.message ? ' input-error' : ''}`}
                    placeholder="Tell us what you need…"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                  />
                  {errors.message && <p className="field-error">{errors.message}</p>}
                </div>

                <button type="submit" className="btn btn-primary contact-submit" disabled={loading}>
                  <FiSend />
                  {loading ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
