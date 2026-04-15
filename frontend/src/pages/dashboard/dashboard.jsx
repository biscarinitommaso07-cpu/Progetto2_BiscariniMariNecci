import { useEffect, useState } from 'react';
import { getPrenotazioni } from '../../api';
import './dashboard.css';

export default function Dashboard() {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);

  // Formattazione data come da mockup: "Thursday, April 2, 2026"
  const oggi = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  useEffect(() => {
    getPrenotazioni()
      .then(({ data }) => setPrenotazioni(data))
      .catch((err) => console.error("Errore caricamento:", err))
      .finally(() => setLoading(false));
  }, []);

  const todayISO = new Date().toISOString().split('T')[0];
  const prenotazioniOggi = prenotazioni.filter(p => p.data === todayISO);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-date">{oggi}</p>
        </div>
      </header>

      {/* Sezione Statistiche (Card) */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue-bg">📅</div>
          <div className="stat-content">
            <p className="stat-label">Today's Bookings</p>
            <h2 className="stat-value">{prenotazioniOggi.length}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon light-blue-bg">🏢</div>
          <div className="stat-content">
            <p className="stat-label">Rooms Available</p>
            <h2 className="stat-value">{119 - prenotazioniOggi.length}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon cyan-bg">🕒</div>
          <div className="stat-content">
            <p className="stat-label">Total Bookings</p>
            <h2 className="stat-value">{prenotazioni.length}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon gray-bg">👤</div>
          <div className="stat-content">
            <p className="stat-label">Classes Today</p>
            <h2 className="stat-value">5</h2> {/* Dato d'esempio mockup */}
          </div>
        </div>
      </div>

      {/* Tabella Prenotazioni Odierne */}
      <section className="table-section">
        <h3 className="section-title">Today's Bookings</h3>
        <p className="section-subtitle">All classroom reservations scheduled for today</p>
        
        <div className="table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Time</th>
                <th>Classes</th>
                <th>Booked By</th>
              </tr>
            </thead>
            <tbody>
              {prenotazioniOggi.length > 0 ? (
                prenotazioniOggi.map((p) => (
                  <tr key={p.id}>
                    <td className="font-bold">Room {p.aula.numero}</td>
                    <td>{p.ora_inizio} - {p.ora_fine}</td>
                    <td>
                      {p.classi.map(c => (
                        <span key={c.id} className="badge-class">{c.anno}{c.sezione} {c.indirizzo.substring(0,4)}</span>
                      ))}
                    </td>
                    <td className="text-muted">{p.utente.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No bookings for today.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}