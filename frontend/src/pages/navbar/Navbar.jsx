import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const initial = user?.nome?.[0]?.toUpperCase() || 'U';

  const links = [
    { label: 'Dashboard',        path: '/dashboard',           icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/>
        <rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
      </svg>
    )},
    { label: 'Weekly Calendar',  path: '/calendario',          icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    )},
    { label: 'New Booking',      path: '/nuova-prenotazione',  icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ), highlight: true },
    { label: 'My Bookings',      path: '/mie-prenotazioni',    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    )},
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="cb-navbar">
      <button className="cb-brand" onClick={() => navigate('/dashboard')}>
        <div className="cb-logo">
          <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
          </svg>
        </div>
        <span className="cb-brand-name">ClassBook</span>
      </button>

      <div className="cb-nav-links">
        {links.map(({ label, path, icon, highlight }) => (
          <button
            key={path}
            className={`cb-nav-link ${highlight ? 'cb-nav-highlight' : ''} ${isActive(path) ? 'cb-nav-active' : ''}`}
            onClick={() => navigate(path)}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="cb-avatar">{initial}</div>
    </nav>
  );
}
