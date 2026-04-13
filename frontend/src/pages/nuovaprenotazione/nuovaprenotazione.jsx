import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAule, getClassi, creaPrenotazione } from '../../api';

export default function NuovaPrenotazione() {
  const [aule, setAule]     = useState([]);
  const [classi, setClassi] = useState([]);
  const [form, setForm]     = useState({
    id_aula:'', data:'', ora_inizio:'', ora_fine:'', classi:[], note:''
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

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Nuova Prenotazione</h2>

      {errore && <p style={{ color:'red' }}>{errore}</p>}

      <label>Aula</label>
      <select value={form.id_aula}
              onChange={e => setForm({...form, id_aula: e.target.value})}>
        <option value="">Seleziona aula (1-119)</option>
        {aule.map(a => (
          <option key={a.ID_AULA} value={a.ID_AULA}>
            Aula {a.NUMERO_AULA}
          </option>
        ))}
      </select>

      <label>Data</label>
      <input type="date" value={form.data}
             onChange={e => setForm({...form, data: e.target.value})} />

      <label>Ora Inizio</label>
      <input type="time" value={form.ora_inizio}
             onChange={e => setForm({...form, ora_inizio: e.target.value})} />

      <label>Ora Fine</label>
      <input type="time" value={form.ora_fine}
             onChange={e => setForm({...form, ora_fine: e.target.value})} />

      <label>Classi coinvolte</label>
      <div>
        {classi.map(c => (
          <label key={c.ID_CLASSE} style={{ display:'block' }}>
            <input type="checkbox"
                   checked={form.classi.includes(c.ID_CLASSE)}
                   onChange={() => toggleClasse(c.ID_CLASSE)} />
            {c.ANNO}{c.SEZIONE} — {c.INDIRIZZO}
          </label>
        ))}
      </div>

      <button onClick={handleSubmit}
              disabled={!form.id_aula || !form.data ||
                        !form.ora_inizio || !form.ora_fine ||
                        form.classi.length === 0}>
        Crea Prenotazione
      </button>
    </div>
  );
}