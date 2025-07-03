const express = require('express');
const request = require('request');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // ✅ Use dynamic port for Render

// ✅ Serve static frontend files (index.html, script.js, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Proxy route to bypass CORS when fetching .m3u8 and .ts files
app.get('/proxy', (req, res) => {
  const streamUrl = req.query.url;

  if (!streamUrl) {
    return res.status(400).send('Missing URL');
  }

  console.log(`[Proxying]: ${streamUrl}`);

  request({
    url: streamUrl,
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Origin': 'https://cartoon-network-player.onrender.com' // optional: some servers check this
    }
  })
    .on('error', (err) => {
      console.error(`[Proxy Error]: ${err.message}`);
      res.status(500).send('Proxy request failed.');
    })
    .pipe(res);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
