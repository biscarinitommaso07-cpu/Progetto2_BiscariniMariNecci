import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPrenotazioni, eliminaPrenotazione } from '../../api';
import Navbar from '../navbar/Navbar';
import './mieprenotazioni.css';

export default function MiePrenotazioni() {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    caricaPrenotazioni();
  }, []);

  const caricaPrenotazioni = async () => {
    try {
      const { data } = await getPrenotazioni();
      setPrenotazioni(data); // ← il backend filtra già per utente loggato
    } catch (err) {
      console.error('Errore nel caricamento prenotazioni:', err);
      alert('Errore nel caricamento delle prenotazioni');
    }
  };

  const handleElimina = async (id) => {
    if (window.confirm('Vuoi eliminare questa prenotazione?')) {
      try {
        await eliminaPrenotazione(id);
        setPrenotazioni(prenotazioni.filter(p => p.ID_PRENOTAZIONE !== id));
      } catch (err) {
        alert(err.response?.data?.error || 'Errore nell\'eliminazione');
      }
    }
  };

  const prenotazioniFiltrate = prenotazioni.filter(p =>
    p.NUMERO_AULA?.toString().includes(filtro) ||
    p.DATA?.includes(filtro) ||
    p.CLASSI?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="mie-prenotazioni-container">
      <Navbar />
      <header className="page-header">
        <h1>Le mie Prenotazioni</h1>
        <button onClick={() => navigate('/dashboard')} className="back-btn">← Torna alla Dashboard</button>
      </header>

      <section className="filtro-section">
        <input
          type="text"
          placeholder="Filtra per aula, data o classe..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="filtro-input"
        />
      </section>

      <main className="prenotazioni-main">
        {prenotazioniFiltrate.length === 0 ? (
          <div className="no-data">
            <p>Nessuna prenotazione trovata</p>
            <button onClick={() => navigate('/nuova-prenotazione')} className="action-btn">
              Crea una nuova prenotazione
            </button>
          </div>
        ) : (
          <div className="prenotazioni-grid">
            {prenotazioniFiltrate.map(p => (
              <div key={p.ID_PRENOTAZIONE} className="prenotazione-card">
                <div className="card-header">
                  <h3>Aula {p.NUMERO_AULA}</h3>
                  <span className="data-badge">{p.DATA}</span>
                </div>
                <div className="card-body">
                  <p><strong>Orario:</strong> {p.ORA_INIZIO} - {p.ORA_FINE}</p>
                  <p><strong>Classi:</strong> {p.CLASSI}</p>
                  {p.NOTE && <p><strong>Note:</strong> {p.NOTE}</p>}
                </div>
                <div className="card-footer">
                  <button
                    onClick={() => handleElimina(p.ID_PRENOTAZIONE)}
                    className="delete-btn"
                  >
                    🗑️ Elimina
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}