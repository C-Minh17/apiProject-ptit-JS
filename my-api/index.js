const fs = require('fs');
const express = require('express');
const cors = require('cors');

// Tạo một ứng dụng Express
const app = express();

// Kích hoạt CORS
app.use(cors());
app.use(express.json());

// Định nghĩa route '/'
app.get('/', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
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

// Xuất Express handler cho Vercel sử dụng
module.exports = app;
module.exports.handler = (req, res) => {
  app(req, res);
};

