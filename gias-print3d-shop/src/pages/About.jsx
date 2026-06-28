import { Link } from 'react-router-dom';
import { FiBox, FiHeart, FiZap, FiUsers } from 'react-icons/fi';
import './About.css';

const values = [
  { icon: <FiBox />, title: 'Quality First', text: 'Every item is printed with industrial-grade filament and inspected before shipping.' },
  { icon: <FiHeart />, title: 'Made with Care', text: 'Small-batch production means attention to detail on every single order.' },
  { icon: <FiZap />, title: 'Fast Turnaround', text: 'Most items ship within 48 hours — custom orders within 5 business days.' },
  { icon: <FiUsers />, title: 'Community Driven', text: 'Our designs are inspired by customer requests and open-source makers worldwide.' },
];

const team = [
  { name: 'Gia Stoica', role: 'Founder & Lead Designer', emoji: '👩‍💻' },
  { name: 'Sofia Chen', role: 'Head of Production', emoji: '👩‍🔧' },
  { name: 'Marcus Webb', role: 'Customer Experience', emoji: '👨‍💼' },
];

export default function About() {
  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <div className="container about-hero-inner">
          <p className="about-eyebrow">Our Story</p>
          <h1 className="about-title">We make 3D printing <span>personal</span></h1>
          <p className="about-sub">
            Gia's Print 3D Shop started in a garage in Arad, Romania in 2021 with one printer and a simple idea —
            high-quality 3D printed objects shouldn't cost a fortune or take weeks to arrive.
            Today we ship hundreds of products to customers across the world.
          </p>
          <Link to="/shop" className="btn btn-primary">Browse our products</Link>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-title">What we stand for</h2>
          <div className="values-grid">
            {values.map(v => (
              <div key={v.title} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container stats-grid">
          <div className="stat"><span className="stat-num">28+</span><span className="stat-label">Products</span></div>
          <div className="stat"><span className="stat-num">4,200+</span><span className="stat-label">Orders shipped</span></div>
          <div className="stat"><span className="stat-num">98%</span><span className="stat-label">Satisfaction rate</span></div>
          <div className="stat"><span className="stat-num">3</span><span className="stat-label">Years in business</span></div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="container">
          <h2 className="section-title">The people behind the prints</h2>
          <div className="team-grid">
            {team.map(m => (
              <div key={m.name} className="team-card">
                <div className="team-avatar">{m.emoji}</div>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
