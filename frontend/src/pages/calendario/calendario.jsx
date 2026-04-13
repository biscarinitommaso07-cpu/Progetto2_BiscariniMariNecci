import FullCalendar from '@fullcalendar/react';
import dayGridPlugin  from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import { getPrenotazioni } from '../../api';

export default function Calendario() {
  const [eventi, setEventi] = useState([]);

  useEffect(() => {
    getPrenotazioni().then(({ data }) => {
      setEventi(data.map(p => ({
        id:    p.ID_PRENOTAZIONE,
        title: `Aula ${p.NUMERO_AULA} — ${p.CLASSI}`,
        start: `${p.DATA}T${p.ORA_INIZIO}`,
        end:   `${p.DATA}T${p.ORA_FINE}`
      })));
    });
  }, []);

  return (
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
    />
  );
}