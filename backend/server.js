require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const app      = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(express.json());

// Diagnostic endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    frontend_url: process.env.FRONTEND_URL,
    google_client_id: process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...',
    db_host: process.env.DB_HOST,
    timestamp: new Date().toISOString()
  });
});

app.use('/auth',            require('./routes/auth'));
app.use('/api/prenotazioni', require('./routes/prenotazioni'));
app.use('/api/aule',         require('./routes/aule'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});