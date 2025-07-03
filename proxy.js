const express = require('express');
const request = require('request');
const path = require('path');
const app = express();

const PORT = 3000;

// Serve static HTML
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint to bypass CORS
app.get('/proxy', (req, res) => {
  const streamUrl = req.query.url;
  if (!streamUrl) return res.status(400).send('Missing URL');
  request({ url: streamUrl, headers: { 'User-Agent': 'Mozilla/5.0' } }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
