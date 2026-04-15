import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPrenotazioni, eliminaPrenotazione } from '../../api';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../navbar/Navbar';
import './mieprenotazioni.css';

export default function MiePrenotazioni() {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { caricaPrenotazioni(); }, []);

  const caricaPrenotazioni = async () => {
    try {
      const { data } = await getPrenotazioni();
      const mie = data.filter(p => p.ID_UTENTE === user?.id);
      setPrenotazioni(mie);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleElimina = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await eliminaPrenotazione(id);
      setPrenotazioni(prev => prev.filter(p => p.ID_PRENOTAZIONE !== id));
    } catch (err) {
      alert(err.response?.data?.error || 'Error deleting booking');
    }
  };

  const filtrate = prenotazioni.filter(p =>
    p.NUMERO_AULA?.toString().includes(filtro) ||
    p.DATA?.includes(filtro) ||
    p.CLASSI?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="mp-shell">
      <Navbar />

      <div className="mp-page">
        <div className="mp-inner">
          {/* Page header */}
          <div className="mp-header">
            <div>
              <h1 className="mp-title">My Bookings</h1>
              <p className="mp-subtitle">Manage your classroom reservations</p>
            </div>
            <button
              className="cb-btn cb-btn-primary"
              onClick={() => navigate('/nuova-prenotazione')}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New Booking
            </button>
          </div>

          {/* Table card */}
          <div className="cb-card">
            {/* Card header with search */}
            <div className="mp-card-header">
              <div>
                <p className="mp-card-title">Your Reservations</p>
                <p className="mp-card-sub">{prenotazioni.length} booking{prenotazioni.length !== 1 ? 's' : ''} total</p>
              </div>
              <input
                type="text"
                className="mp-search"
                placeholder="Filter by room, date or class…"
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
              />
            </div>

            {loading ? (
              <p className="mp-empty">Loading…</p>
            ) : filtrate.length === 0 ? (
              <div className="mp-empty-state">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#CBD5E1" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <p>No bookings found</p>
                <button className="cb-btn cb-btn-primary" onClick={() => navigate('/nuova-prenotazione')}>
                  Create a booking
                </button>
              </div>
            ) : (
              <table className="cb-table">
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Classes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrate.map(p => (
                    <tr key={p.ID_PRENOTAZIONE}>
                      <td><span className="mp-room">Room {p.NUMERO_AULA}</span></td>
                      <td>{new Date(p.DATA).toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', year:'numeric' })}</td>
                      <td>{p.ORA_INIZIO} – {p.ORA_FINE}</td>
                      <td>
                        <div className="mp-badges">
                          {p.CLASSI?.split(',').map((c, i) => (
                            <span key={i} className="cb-badge">{c.trim()}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <button
                          className="mp-delete"
                          onClick={() => handleElimina(p.ID_PRENOTAZIONE)}
                          title="Delete booking"
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6"/><path d="M14 11v6"/>
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
