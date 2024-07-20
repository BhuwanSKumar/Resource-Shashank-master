const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3306;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sql',
  database: 'file_upload_db'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle file upload
app.post('/upload', upload.fields([{ name: 'image', maxCount: 10 }, { name: 'pdf', maxCount: 1 }]), (req, res) => {
  const { title, description, category, num_pages } = req.body;
  const image = req.files['image'] ? req.files['image'][0].buffer : null;
  const pdf = req.files['pdf'] ? req.files['pdf'][0].buffer : null;

  const sql = 'INSERT INTO uploads (title, description, category, num_pages, image, pdf) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [title, description, category, num_pages, image, pdf], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    res.send('File uploaded successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
