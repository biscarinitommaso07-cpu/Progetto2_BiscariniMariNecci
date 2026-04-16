import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login              from './pages/login/login';
import Dashboard          from './pages/Dashboard/Dashboard';
import Calendario         from './pages/calendario/calendario';
import NuovaPrenotazione  from './pages/NuovaPrenotazione/NuovaPrenotazione';
import MiePrenotazioni    from './pages/MiePrenotazioni/MiePrenotazioni';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
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
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;