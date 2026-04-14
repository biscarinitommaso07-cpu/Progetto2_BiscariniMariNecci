const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  const { credential } = req.body;
  try {
    console.log('[AUTH] Token ricevuto dal frontend');
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    
    console.log(`[AUTH] Email verificata: ${email}`);

    const [rows] = await db.query(
      'SELECT * FROM Utente WHERE EMAIL = ?', [email]
    );
    
    console.log(`[AUTH] Ricerca nel DB: ${rows.length} righe trovate`);
    
    if (rows.length === 0) {
      console.log(`[AUTH] Email ${email} non autorizzata`);
      return res.status(403).json({ error: 'Utente non autorizzato' });
    }

    const utente = rows[0];
    console.log(`[AUTH] Utente trovato: ${utente.NOME} ${utente.COGNOME}`);

    const token = jwt.sign(
      { id: utente.ID, email: utente.EMAIL, ruolo: utente.RUOLO,
        nome: utente.NOME, cognome: utente.COGNOME },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    console.log(`[AUTH] Token creato con successo`);
    res.json({ token, utente });
  } catch (err) {
    console.error('[AUTH] Errore:', err.message);
    res.status(500).json({ error: 'Errore autenticazione: ' + err.message });
  }
});

// GET /auth/me
router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;