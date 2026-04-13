require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const app      = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

app.use('/auth',            require('./routes/auth'));
app.use('/api/prenotazioni', require('./routes/prenotazioni'));
app.use('/api/aule',         require('./routes/aule'));
app.use('/api/classi',       require('./routes/classi'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server attivo su http://localhost:${PORT}`)
);