// ...existing code...
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { sequelize } = require('./db');
const models = require('./config/models'); // loads associations
const errorMiddleware = require('./middleware/error.middlware');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));

// serve uploads (static)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// explicit image streaming route
app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../uploads', imageName);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).send('Image not found');
  }

  const ext = path.extname(imagePath).toLowerCase();
  const mimeType = ext === '.jpg' || ext === '.jpeg'
    ? 'image/jpeg'
    : ext === '.png'
    ? 'image/png'
    : 'application/octet-stream';

  res.setHeader('Content-Type', mimeType);
  const readStream = fs.createReadStream(imagePath);
  readStream.pipe(res);
});

// serve existing frontend files from project root ( /public)
app.use('/', express.static(path.join(__dirname, '../public')));

// mount API
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/cars', require('./routes/cars.routes'));
app.use('/api/bookings', require('./routes/bookings.routes'));
app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // for dev: use migrations in production
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('DB connection failed', err);
  }
})();
