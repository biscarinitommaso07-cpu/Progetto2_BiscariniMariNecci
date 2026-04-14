import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login              from './pages/Login/Login';
import Dashboard          from './pages/Dashboard/Dashboard';
import Calendario         from './pages/Calendario/Calendario';
import NuovaPrenotazione  from './pages/NuovaPrenotazione/NuovaPrenotazione';
import MiePrenotazioni    from './pages/MiePrenotazioni/MiePrenotazioni';

const GOOGLE_CLIENT_ID = 'IL_TUO_CLIENT_ID';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/calendario" element={
              <PrivateRoute><Calendario /></PrivateRoute>} />
            <Route path="/nuova-prenotazione" element={
              <PrivateRoute><NuovaPrenotazione /></PrivateRoute>} />
            <Route path="/mie-prenotazioni" element={
              <PrivateRoute><MiePrenotazioni /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;