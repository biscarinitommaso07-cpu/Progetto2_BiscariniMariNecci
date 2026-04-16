import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>ClassBook</h1>
          <div className="user-info">
            <span>Ciao, {user?.nome} {user?.cognome}</span>
            <button onClick={handleLogout} className="logout-btn">Esci</button>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button onClick={() => navigate('/calendario')} className="nav-btn">
           Calendario
        </button>
        <button onClick={() => navigate('/nuova-prenotazione')} className="nav-btn">
           Nuova Prenotazione
        </button>
        <button onClick={() => navigate('/mie-prenotazioni')} className="nav-btn">
           Mie Prenotazioni
        </button>
      </nav>

      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>Benvenuto in ClassBook</h2>
          <p>Sistema di prenotazione aule scolastiche</p>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>Calendario</h3>
              <p>Visualizza tutte le prenotazioni di aule</p>
              <button onClick={() => navigate('/calendario')}>Vai al Calendario</button>
            </div>

            <div className="info-card">
              <h3>Nuova Prenotazione</h3>
              <p>Prenota un'aula per le tue esigenze</p>
              <button onClick={() => navigate('/nuova-prenotazione')}>Crea Prenotazione</button>
            </div>

            <div className="info-card">
              <h3>Mie Prenotazioni</h3>
              <p>Gestisci le tue prenotazioni</p>
              <button onClick={() => navigate('/mie-prenotazioni')}>Vedi Prenotazioni</button>
            </div>
          </div>
        </section>

        <section className="user-section">
          <h2>Informazioni Profilo</h2>
          <div className="profile-info">
            <p><strong>Nome:</strong> {user?.nome}</p>
            <p><strong>Cognome:</strong> {user?.cognome}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Ruolo:</strong> {user?.ruolo}</p>
          </div>
        </section>
      </main>
    </div>
  );
}