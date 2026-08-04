const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw-hd207gzF4Ctri0XFn_m11PcFOR3AUD7TU6rD5BQiQHX6dft7m22U9C_nox8JTYtV/exec';

app.post('/webhook', async (req, res) => {
  try {
    console.log('📩 Webhook received:', JSON.stringify(req.body));
    
    const response = await axios.post(APP_SCRIPT_URL, req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('✅ Forwarded to Apps Script, status:', response.status);
    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(200).send('OK');
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/webhook', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
