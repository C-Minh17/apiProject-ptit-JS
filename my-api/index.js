const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Route gốc ("/"): trả về JSON thay vì HTML
app.get('/', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Lỗi đọc file JSON' });
    }

    // Trả về dữ liệu dạng JSON
    const products = JSON.parse(data);
    res.json(products);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API đang chạy tại http://localhost:${PORT}`);
});
