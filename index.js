app.get('/download', async (req, res) => {
    const videoURL = req.query.url;
    if (!videoURL) return res.status(400).json({ error: 'No URL' });

    // سنستخدم محرك بحث مفتوح لا يحتاج شهادات معقدة
    const finalUrl = `https://save-from.net/api/convert?url=${encodeURIComponent(videoURL)}`;
    res.json({ url: finalUrl });
});
