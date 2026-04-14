import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginGoogle } from '../../api';

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();

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

  return (
    <div style={{ display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <h1>ClassBook</h1>
      <p>Accedi con il tuo account scolastico</p>
      <GoogleLogin onSuccess={handleSuccess}
                   onError={() => alert('Login fallito')} />
    </div>
  );
}