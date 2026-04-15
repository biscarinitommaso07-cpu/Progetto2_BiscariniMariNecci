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
      alert(err.response?.data?.error || 'Accesso negato');
    }
  };

  return (
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
        </p>
      </div>
    </div>
  );
}
