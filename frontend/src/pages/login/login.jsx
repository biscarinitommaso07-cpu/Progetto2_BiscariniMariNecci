import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginGoogle } from '../../api';
import './login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      console.log('[LOGIN] Invio credential a backend');
      const { data } = await loginGoogle(credentialResponse.credential);
      console.log('[LOGIN] Risposta ricevuta:', data);
      login(data.token, data.utente);
      navigate('/dashboard');
    } catch (err) {
      console.error('[LOGIN] Errore:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Accesso negato');
    }
  };

  const handleError = () => {
    console.error('[LOGIN] Errore Google OAuth');
    alert('Errore durante il login con Google');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>ClassBook</h1>
        <p>Sistema di prenotazione aule scolastiche</p>
        <div className="google-login">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            theme="outline"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </div>
      </div>
    </div>
  );
}