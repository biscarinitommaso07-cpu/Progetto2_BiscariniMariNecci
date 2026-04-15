import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginGoogle } from '../../api';
import './login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { data } = await loginGoogle(credentialResponse.credential);
      login(data.token, data.utente);
      navigate('/dashboard');
    } catch (err) {
<<<<<<< Updated upstream
      alert(err.response?.data?.error || 'Accesso negato');
=======
      alert(err.response?.data?.error || 'Accesso negato. Account non registrato.');
>>>>>>> Stashed changes
    }
  };

  return (
<<<<<<< Updated upstream
    <div className="login-shell">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
          </svg>
        </div>

        <h1 className="login-appname">ClassBook</h1>
        <p className="login-tagline">Classroom Booking System</p>

        <div className="login-box">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-desc">Sign in with your school account to manage classroom bookings</p>

          <div className="login-google-wrapper">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => alert('Login fallito')}
              text="continue_with"
              shape="rectangular"
              logo_alignment="left"
              width="320"
            />
          </div>

          <div className="login-divider">
            <span>SCHOOL ACCOUNTS ONLY</span>
          </div>

          <p className="login-note">
            Use your <strong>@school.edu</strong> email address to access the booking system.
          </p>
        </div>

        <p className="login-support">
          Need help? Contact <a href="mailto:it@school.edu">IT Support</a>
=======
    <div className="login-page">
      <div className="login-bg">
        <div className="login-bg-grid" />
      </div>

      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="10" height="10" rx="2" fill="white" fillOpacity="0.9"/>
              <rect x="16" y="2" width="10" height="10" rx="2" fill="white" fillOpacity="0.6"/>
              <rect x="2" y="16" width="10" height="10" rx="2" fill="white" fillOpacity="0.6"/>
              <rect x="16" y="16" width="10" height="10" rx="2" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <span className="login-logo-text">ClassBook</span>
        </div>

        <p className="login-tagline">Sistema di Prenotazione Aule</p>

        <div className="login-divider" />

        <h2 className="login-title">Bentornato</h2>
        <p className="login-subtitle">
          Accedi con il tuo account scolastico per gestire le prenotazioni delle aule
        </p>

        <div className="login-google-wrapper">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert('Login fallito')}
            width="100%"
            text="continue_with"
            shape="rectangular"
            logo_alignment="left"
          />
        </div>

        <div className="login-note">
          <span className="login-note-line" />
          <span className="login-note-text">SOLO ACCOUNT SCOLASTICI</span>
          <span className="login-note-line" />
        </div>

        <p className="login-help">
          Usa il tuo indirizzo <strong>@scuola.edu</strong> per accedere alla piattaforma.
        </p>

        <p className="login-support">
          Hai bisogno di aiuto? <a href="mailto:supporto@scuola.it">Contatta il supporto IT</a>
>>>>>>> Stashed changes
        </p>
      </div>
    </div>
  );
}
