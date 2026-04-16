const express = require('express');
const db = require('../config/db');
const { authMiddleware, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

// GET /api/prenotazioni
router.get('/', async (req, res) => {
  const { data, aula, classe } = req.query;
  try {
    let query = `
      SELECT p.ID_PRENOTAZIONE, p.DATA, p.ORA_INIZIO, p.ORA_FINE, p.NOTE,
             a.NUMERO_AULA, a.DESCRIZIONE,
             u.NOME, u.COGNOME, u.EMAIL,
             GROUP_CONCAT(CONCAT(c.ANNO, c.SEZIONE, ' ', c.INDIRIZZO)
               ORDER BY c.ANNO SEPARATOR ', ') AS CLASSI
      FROM prenotazione p
      JOIN aula a         ON p.ID_AULA   = a.ID_AULA
      JOIN utente u       ON p.ID_UTENTE = u.ID
      LEFT JOIN Pren_Classe pc ON p.ID_PRENOTAZIONE = pc.ID_PRENOTAZIONE
      LEFT JOIN classe c       ON pc.ID_CLASSE = c.ID_CLASSE
      WHERE p.ID_UTENTE = ?
    `;
    const params = [req.user.id]; // ← filtra per utente loggato

    if (data)   { query += ' AND p.DATA = ?';        params.push(data); }
    if (aula)   { query += ' AND a.NUMERO_AULA = ?'; params.push(aula); }
    if (classe) { query += ' AND c.ID_CLASSE = ?';   params.push(classe); }

    query += ' GROUP BY p.ID_PRENOTAZIONE ORDER BY p.DATA, p.ORA_INIZIO';

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore server' });
  }
});

// GET /api/prenotazioni/all
router.get('/all', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.ID_PRENOTAZIONE, p.DATA, p.ORA_INIZIO, p.ORA_FINE, p.NOTE,
             a.NUMERO_AULA, a.DESCRIZIONE,
             u.NOME, u.COGNOME, u.EMAIL,
             GROUP_CONCAT(CONCAT(c.ANNO, c.SEZIONE, ' ', c.INDIRIZZO)
               ORDER BY c.ANNO SEPARATOR ', ') AS CLASSI
      FROM prenotazione p
      JOIN aula a         ON p.ID_AULA   = a.ID_AULA
      JOIN utente u       ON p.ID_UTENTE = u.ID
      LEFT JOIN Pren_Classe pc ON p.ID_PRENOTAZIONE = pc.ID_PRENOTAZIONE
      LEFT JOIN classe c       ON pc.ID_CLASSE = c.ID_CLASSE
      GROUP BY p.ID_PRENOTAZIONE 
      ORDER BY p.DATA, p.ORA_INIZIO
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore server' });
  }
});

// GET /api/prenotazioni/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.*, a.NUMERO_AULA, u.NOME, u.COGNOME
       FROM prenotazione p
       JOIN aula a   ON p.ID_AULA   = a.ID_AULA
       JOIN utente u ON p.ID_UTENTE = u.ID
       WHERE p.ID_PRENOTAZIONE = ?`, [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Non trovata' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore server' });
  }
});

// POST /api/prenotazioni
router.post('/', requireRole('docente', 'ata', 'admin'), async (req, res) => {
  const { id_aula, data, ora_inizio, ora_fine, note, classi } = req.body;
  const id_utente = req.user.id;

  if (!id_aula || !data || !ora_inizio || !ora_fine || !classi?.length)
    return res.status(400).json({ error: 'Campi obbligatori mancanti' });

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [conflitti] = await conn.query(
      `SELECT ID_PRENOTAZIONE FROM prenotazione
       WHERE ID_AULA = ?
         AND DATA = ?
         AND ORA_INIZIO < ?
         AND ORA_FINE   > ?`,
      [id_aula, data, ora_fine, ora_inizio]
    );

    if (conflitti.length > 0) {
      await conn.rollback();
      return res.status(409).json({ error: 'Aula già prenotata in questa fascia oraria' });
    }

    const [result] = await conn.query(
      `INSERT INTO prenotazione (ID_AULA, ID_UTENTE, DATA, ORA_INIZIO, ORA_FINE, NOTE)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_aula, id_utente, data, ora_inizio, ora_fine, note || null]
    );
    const idPrenotazione = result.insertId;

    for (const idClasse of classi) {
      await conn.query(
        'INSERT INTO Pren_Classe (ID_PRENOTAZIONE, ID_CLASSE) VALUES (?, ?)',
        [idPrenotazione, idClasse]
      );
    }

    await conn.commit();
    res.status(201).json({ id: idPrenotazione, message: 'Prenotazione creata' });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ error: 'Errore server' });
  } finally {
    conn.release();
  }
});

// DELETE /api/prenotazioni/:id
router.delete('/:id', requireRole('docente', 'ata', 'admin'), async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT ID_UTENTE FROM prenotazione WHERE ID_PRENOTAZIONE = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Non trovata' });

    if (rows[0].ID_UTENTE !== req.user.id && req.user.ruolo !== 'admin')
      return res.status(403).json({ error: 'Non puoi eliminare prenotazioni altrui' });

    await db.query('DELETE FROM prenotazione WHERE ID_PRENOTAZIONE = ?', [req.params.id]);
    res.json({ message: 'Prenotazione eliminata' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore server' });
  }
});

module.exports = router;