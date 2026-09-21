require('dotenv').config();
const express = require('express');
const path    = require('path');
const { Pool } = require('pg');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── DB ──────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Ensure table exists
pool.query(`
  CREATE TABLE IF NOT EXISTS comments (
    id        SERIAL PRIMARY KEY,
    name      TEXT NOT NULL,
    text      TEXT NOT NULL,
    time_str  TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )
`).catch(err => console.error('DB init error:', err.message));

// ── Middleware ──────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── API: GET comments ──────────────────────────────
app.get('/api/comments', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT name, text, time_str FROM comments ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/comments error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── API: POST comment ──────────────────────────────
app.post('/api/comments', async (req, res) => {
  const { name, text, time_str } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Comment text is required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO comments (name, text, time_str) VALUES ($1, $2, $3) RETURNING *',
      [name || 'Guest', text.trim(), time_str || new Date().toISOString()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/comments error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🎂  Birthday website running!`);
  console.log(`👉  Open: http://localhost:${PORT}\n`);
});