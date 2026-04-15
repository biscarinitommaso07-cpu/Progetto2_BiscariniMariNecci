const express = require('express');
const db = require('../config/db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

// GET /api/classi — elenco tutte le classi
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM Classe ORDER BY ANNO, SEZIONE'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore server' });
  }
});

// GET /api/classi/:id — dettaglio singola classe
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM Classe WHERE ID_CLASSE = ?', [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Classe non trovata' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore server' });
  }
});

module.exports = router;