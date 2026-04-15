import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAule, getClassi, creaPrenotazione } from '../../api';
import Navbar from '../navbar/Navbar';
import './nuovaprenotazione.css';

const TIME_SLOTS = [
  '07:00','07:30','08:00','08:30','09:00','09:30',
  '10:00','10:30','11:00','11:30','12:00','12:30',
  '13:00','13:30','14:00','14:30','15:00','15:30',
  '16:00','16:30','17:00','17:30','18:00','18:30','19:00',
];

export default function NuovaPrenotazione() {
  const [aule, setAule]     = useState([]);
  const [classi, setClassi] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm]     = useState({
    id_aula: '', data: '', ora_inizio: '', ora_fine: '', classi: [], note: ''
  });
  const [errore, setErrore] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAule().then(r => setAule(r.data));
    getClassi().then(r => setClassi(r.data));
  }, []);

  const handleSubmit = async () => {
    setErrore('');
    try {
      await creaPrenotazione(form);
      navigate('/mie-prenotazioni');
    } catch (err) {
      setErrore(err.response?.data?.error || 'Errore nella prenotazione');
    }
  };

  const toggleClasse = (id) => {
    setForm(f => ({
      ...f,
      classi: f.classi.includes(id)
        ? f.classi.filter(c => c !== id)
        : [...f.classi, id]
    }));
  };

  const classiFiltered = classi.filter(c =>
    `${c.ANNO}${c.SEZIONE} ${c.INDIRIZZO}`.toLowerCase().includes(search.toLowerCase())
  );

  const isValid = form.id_aula && form.data && form.ora_inizio && form.ora_fine && form.classi.length > 0;

  return (
    <div className="np-shell">
      <Navbar />

      <div className="np-page">
        <div className="np-inner">
          {/* Header */}
          <div className="np-header">
            <div>
              <h1 className="np-title">New Booking</h1>
              <p className="np-subtitle">Reserve a classroom for your class</p>
            </div>
          </div>

          {/* Form card */}
          <div className="cb-card np-card">
            <div className="np-form-header">
              <p className="np-form-title">Booking Details</p>
              <p className="np-form-sub">Fill in the information below to reserve a classroom</p>
            </div>

            {errore && (
              <div className="np-error">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errore}
              </div>
            )}

            <div className="np-fields">
              {/* Room */}
              <div className="np-field">
                <label className="np-label">Room Number</label>
                <select
                  className="np-select"
                  value={form.id_aula}
                  onChange={e => setForm({...form, id_aula: e.target.value})}
                >
                  <option value="">Select a room (1-119)</option>
                  {aule.map(a => (
                    <option key={a.ID_AULA} value={a.ID_AULA}>
                      Room {a.NUMERO_AULA}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="np-field">
                <label className="np-label">Date</label>
                <div className="np-input-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#94A3B8" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <input
                    type="date"
                    className="np-input has-icon"
                    value={form.data}
                    onChange={e => setForm({...form, data: e.target.value})}
                  />
                </div>
              </div>

              {/* Time row */}
              <div className="np-field np-field-row">
                <div className="np-field-half">
                  <label className="np-label">Start Time</label>
                  <select
                    className="np-select"
                    value={form.ora_inizio}
                    onChange={e => setForm({...form, ora_inizio: e.target.value})}
                  >
                    <option value="">Select start time</option>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="np-field-half">
                  <label className="np-label">End Time</label>
                  <select
                    className="np-select"
                    value={form.ora_fine}
                    onChange={e => setForm({...form, ora_fine: e.target.value})}
                  >
                    <option value="">Select end time</option>
                    {TIME_SLOTS.filter(t => t > form.ora_inizio).map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Classes */}
              <div className="np-field">
                <label className="np-label">Classes Involved</label>
                <input
                  type="text"
                  className="np-input"
                  placeholder="Search and select classes..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />

                {/* Selected badges */}
                {form.classi.length > 0 && (
                  <div className="np-selected">
                    {form.classi.map(id => {
                      const c = classi.find(x => x.ID_CLASSE === id);
                      return c ? (
                        <span key={id} className="np-badge" onClick={() => toggleClasse(id)}>
                          {c.ANNO}{c.SEZIONE}
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                {/* Dropdown list */}
                {search && (
                  <div className="np-dropdown">
                    {classiFiltered.length === 0 ? (
                      <p className="np-dropdown-empty">No classes found</p>
                    ) : classiFiltered.map(c => (
                      <label key={c.ID_CLASSE} className="np-dropdown-item">
                        <input
                          type="checkbox"
                          checked={form.classi.includes(c.ID_CLASSE)}
                          onChange={() => toggleClasse(c.ID_CLASSE)}
                        />
                        <span>{c.ANNO}{c.SEZIONE} — {c.INDIRIZZO}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="np-actions">
              <button className="cb-btn" onClick={() => navigate('/dashboard')}>
                Cancel
              </button>
              <button
                className="cb-btn cb-btn-primary"
                onClick={handleSubmit}
                disabled={!isValid}
              >
                Create Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
