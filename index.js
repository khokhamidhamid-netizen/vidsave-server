
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();

app.use(cors());

app.get('/download', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'No URL provided' });
  
  exec(`yt-dlp -f best -g "${url}"`, (error, stdout) => {
    if (error) return res.status(500).json({ error: 'Failed to get video' });
    res.json({ url: stdout.trim() });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
