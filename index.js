const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(__dirname));

// استخدام مكتبة بسيطة ومتوافقة مع Vercel
app.get('/download', async (req, res) => {
    const videoURL = req.query.url;
    if (!videoURL) return res.status(400).json({ error: 'يرجى وضع رابط' });

    // هنا نقوم بطلب الرابط المباشر للفيديو
    try {
        // نستخدم رابط خارجي كمحرك للتحميل لتجنب مشاكل السيرفر
        const downloadApi = `https://api.vidsave.com/info?url=${encodeURIComponent(videoURL)}`;
        res.json({ url: downloadApi }); 
    } catch (error) {
        res.status(500).json({ error: "خطأ في السيرفر" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
