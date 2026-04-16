import FullCalendar from '@fullcalendar/react';
import dayGridPlugin  from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import { getTutteLePrenotazioni } from '../../api';
import Navbar from '../navbar/Navbar';
import './calendario.css';

export default function Calendario() {
  const [eventi, setEventi] = useState([]);

  useEffect(() => {
    getTutteLePrenotazioni()
      .then(({ data }) => {
        setEventi(data.map(p => ({
          id:    p.ID_PRENOTAZIONE,
          title: `Aula ${p.NUMERO_AULA} — ${p.CLASSI}`,
          start: `${p.DATA}T${p.ORA_INIZIO}`,
          end:   `${p.DATA}T${p.ORA_FINE}`,
          backgroundColor: '#2563EB',
          borderColor: '#1D4ED8',
          textColor: '#fff',
        })));
      })
      .catch(err => {
        console.error('Errore caricamento prenotazioni calendario:', err.response?.data || err.message);
      });
  }, []);

  return (
    <div className="cal-shell">
      <Navbar />
      <div className="cal-page">
        <div className="cal-inner">
          <div className="cal-header">
            <div>
              <h1 className="cal-title">Calendario Settimanale</h1>
              <p className="cal-subtitle">Panoramica di tutte le prenotazioni d'aula</p>
            </div>
          </div>
          <div className="cb-card cal-card">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left:   'prev,next today',
                center: 'title',
                right:  'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={eventi}
              locale="it"
              height="auto"
              slotMinTime="07:00:00"
              slotMaxTime="20:00:00"
              allDaySlot={false}
              nowIndicator={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}