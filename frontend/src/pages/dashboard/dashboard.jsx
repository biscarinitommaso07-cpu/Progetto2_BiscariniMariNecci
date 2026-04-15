import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
<<<<<<< Updated upstream
import { getPrenotazioni } from '../../api';
import Navbar from '../navbar/Navbar';
import './dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPrenotazioni()
      .then(({ data }) => setPrenotazioni(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = prenotazioni.filter(p => p.DATA === todayStr);

  const roomsAvailable = 119; // total rooms
  const bookedRoomsToday = new Set(todayBookings.map(p => p.NUMERO_AULA)).size;

  const stats = [
    {
      label: "Today's Bookings",
      value: todayBookings.length,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" width="22" height="22">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
    {
      label: 'Rooms Available',
      value: roomsAvailable - bookedRoomsToday,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" width="22" height="22">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      label: 'Total Bookings',
      value: prenotazioni.length,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" width="22" height="22">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
    {
      label: 'Classes Today',
      value: todayBookings.reduce((acc, p) => {
        const c = p.CLASSI?.split(',').length || 0;
        return acc + c;
      }, 0),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" width="22" height="22">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
=======
import { useEffect, useState } from 'react';
import { getPrenotazioni } from '../../api';
import './dashboard.css';

const oggi = new Date().toLocaleDateString('it-IT', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPrenotazioni()
      .then(({ data }) => setPrenotazioni(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const prenotazioniOggi = prenotazioni.filter(p => p.DATA === todayStr);
  const auleDisponibili = 119 - prenotazioniOggi.length;

  const classiUniche = new Set(
    prenotazioniOggi.flatMap(p => (p.CLASSI || '').split(',').map(c => c.trim()))
  ).size;

  const stats = [
    {
      label: 'Prenotazioni Oggi',
      value: prenotazioniOggi.length,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <rect x="2" y="4" width="16" height="13" rx="2" fillOpacity="0.2"/>
          <path d="M2 8h16M6 2v4M14 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      ),
      color: '#6366f1',
      bg: '#eef0fd',
    },
    {
      label: 'Aule Disponibili',
      value: auleDisponibili,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <rect x="2" y="3" width="16" height="14" rx="2" fillOpacity="0.2"/>
          <path d="M7 10l2.5 2.5L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      ),
      color: '#10b981',
      bg: '#ecfdf5',
    },
    {
      label: 'Prenotazioni Totali',
      value: prenotazioni.length,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="10" cy="10" r="8" fillOpacity="0.2"/>
          <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      ),
      color: '#f59e0b',
      bg: '#fffbeb',
    },
    {
      label: 'Classi Oggi',
      value: classiUniche,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="7" cy="7" r="3" fillOpacity="0.2"/>
          <circle cx="13" cy="7" r="3" fillOpacity="0.2"/>
          <path d="M2 17c0-3 2.5-5 5-5h6c2.5 0 5 2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      ),
      color: '#8b5cf6',
      bg: '#f5f3ff',
>>>>>>> Stashed changes
    },
  ];

  return (
<<<<<<< Updated upstream
    <div className="db-shell">
      <Navbar />

      <div className="db-page">
        <div className="db-inner">
          {/* Page header */}
          <div className="db-header">
            <div>
              <h1 className="db-title">Dashboard</h1>
              <p className="db-date">{today}</p>
            </div>
            <button className="cb-btn" onClick={() => { logout(); navigate('/login'); }}>
              Sign out
            </button>
          </div>

          {/* Stats */}
          <div className="db-stats">
            {stats.map((s, i) => (
              <div key={i} className="db-stat-card">
                <div className="db-stat-icon">{s.icon}</div>
                <div className="db-stat-info">
                  <p className="db-stat-label">{s.label}</p>
                  <p className="db-stat-value">{loading ? '…' : s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Today's bookings table */}
          <div className="cb-card">
            <div className="db-table-header">
              <div>
                <p className="db-table-title">Today's Bookings</p>
                <p className="db-table-sub">All classroom reservations scheduled for today</p>
              </div>
            </div>

            {loading ? (
              <p className="db-empty">Loading…</p>
            ) : todayBookings.length === 0 ? (
              <p className="db-empty">No bookings for today.</p>
            ) : (
              <table className="cb-table">
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Time</th>
                    <th>Classes</th>
                    <th>Booked By</th>
                  </tr>
                </thead>
                <tbody>
                  {todayBookings.map(p => (
                    <tr key={p.ID_PRENOTAZIONE}>
                      <td>Room {p.NUMERO_AULA}</td>
                      <td>{p.ORA_INIZIO} – {p.ORA_FINE}</td>
                      <td>
                        <div className="db-badges">
                          {p.CLASSI?.split(',').map((c, i) => (
                            <span key={i} className="cb-badge">{c.trim()}</span>
                          ))}
                        </div>
                      </td>
                      <td className="db-bookedby">{p.EMAIL || user?.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
=======
    <div className="dashboard">
      <div className="dashboard-head">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-date">{oggi.charAt(0).toUpperCase() + oggi.slice(1)}</p>
          </div>
          <button className="btn-primary" onClick={() => navigate('/nuova-prenotazione')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Nuova Prenotazione
          </button>
        </div>

        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <div>
                <p className="stat-label">{s.label}</p>
                <p className="stat-value" style={{ color: s.color }}>
                  {loading ? '—' : s.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-section">
          <div className="section-head">
            <h2 className="section-title">Prenotazioni di Oggi</h2>
            <span className="section-badge">{prenotazioniOggi.length} totali</span>
          </div>

          {loading ? (
            <div className="empty-state">Caricamento...</div>
          ) : prenotazioniOggi.length === 0 ? (
            <div className="empty-state">
              <p>Nessuna prenotazione per oggi.</p>
              <button className="btn-outline" onClick={() => navigate('/nuova-prenotazione')}>
                Crea la prima prenotazione
              </button>
            </div>
          ) : (
            <div className="bookings-table">
              <div className="table-head">
                <span>Aula</span>
                <span>Orario</span>
                <span>Classi</span>
                <span>Prenotato da</span>
              </div>
              {prenotazioniOggi.map(p => (
                <div key={p.ID_PRENOTAZIONE} className="table-row">
                  <span className="room-badge">Aula {p.NUMERO_AULA}</span>
                  <span className="time-text">{p.ORA_INIZIO?.slice(0,5)} – {p.ORA_FINE?.slice(0,5)}</span>
                  <span className="classes-cell">
                    {(p.CLASSI || '').split(',').map(c => (
                      <span key={c} className="class-pill">{c.trim()}</span>
                    ))}
                  </span>
                  <span className="user-text">{p.NOME} {p.COGNOME}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="quick-actions">
          <div className="qa-card" onClick={() => navigate('/calendario')}>
            <div className="qa-icon" style={{ background: '#eef0fd', color: '#6366f1' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
                <rect x="2" y="4" width="18" height="15" rx="2" fillOpacity="0.25"/>
                <path d="M2 9h18M7 2v5M15 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div>
              <p className="qa-title">Calendario Settimanale</p>
              <p className="qa-sub">Vista completa delle prenotazioni</p>
            </div>
            <svg className="qa-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="qa-card" onClick={() => navigate('/mie-prenotazioni')}>
            <div className="qa-icon" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
                <rect x="3" y="2" width="16" height="18" rx="2" fillOpacity="0.25"/>
                <path d="M7 7h8M7 11h8M7 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div>
              <p className="qa-title">Le mie Prenotazioni</p>
              <p className="qa-sub">Gestisci e cancella le tue prenotazioni</p>
            </div>
            <svg className="qa-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
>>>>>>> Stashed changes
  );
}
