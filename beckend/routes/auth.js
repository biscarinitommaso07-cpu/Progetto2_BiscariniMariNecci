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
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const { email } = ticket.getPayload();


    const [rows] = await db.query(
      'SELECT * FROM Utente WHERE EMAIL = ?', [email]
    );
    if (rows.length === 0) {
      return res.status(403).json({ error: 'Utente non autorizzato' });
    }

    const utente = rows[0];

    const token = jwt.sign(
      { id: utente.ID, email: utente.EMAIL, ruolo: utente.RUOLO,
        nome: utente.NOME, cognome: utente.COGNOME },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, utente });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore autenticazione' });
  }
});

// GET /auth/me
router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;