// ... (import precedenti)

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // ... (stati loading e prenotazioni)

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
  }};