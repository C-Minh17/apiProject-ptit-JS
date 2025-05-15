const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Lỗi đọc file JSON' });
    }

    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (parseErr) {
      res.status(500).json({ error: 'Lỗi phân tích dữ liệu JSON' });
    }
  });
});

// Cho Vercel handler
module.exports = app;
module.exports.handler = (req, res) => {
  app(req, res);
};