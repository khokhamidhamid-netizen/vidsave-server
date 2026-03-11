const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(__dirname));

app.get('/download', (req, res) => {
    const videoURL = req.query.url;
    if (!videoURL) return res.status(400).json({ error: 'No URL' });

    exec(`yt-dlp -f best -g "${videoURL}"`, (error, stdout) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json({ url: stdout.trim() });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => console.log("Server running"));
