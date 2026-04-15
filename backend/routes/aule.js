const express = require('express');
const db = require('../config/db');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Aula ORDER BY NUMERO_AULA');
  res.json(rows);
});

// Verifica disponibilità aula in una fascia oraria
router.get('/:id/disponibilita', async (req, res) => {
  const { data, ora_inizio, ora_fine } = req.query;
  const [conflitti] = await db.query(
    `SELECT COUNT(*) AS n FROM Prenotazione
     WHERE ID_AULA = ? AND DATA = ?
       AND ORA_INIZIO < ? AND ORA_FINE > ?`,
    [req.params.id, data, ora_fine, ora_inizio]
  );
  res.json({ disponibile: conflitti[0].n === 0 });
});

module.exports = router;