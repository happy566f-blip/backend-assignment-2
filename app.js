const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.json()); // parse JSON request bodies
app.use(logger);         // custom logger middleware

// ---------- Routes ----------
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Student Management REST API is running' });
});

app.use('/students', studentRoutes); // modular routing

// ---------- 404 handler (unknown routes) ----------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// ---------- Global error handler ----------
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Malformed JSON body -> 400 Bad Request
  if (err.type === 'entity.parse.failed') {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid JSON in request body' });
  }

  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
