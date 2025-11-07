// ...existing code...
const express = require('express');
const path = require('path');
require('dotenv').config();
const { sequelize } = require('./db');
const models = require('./config/models'); // loads associations
const errorMiddleware = require('./middleware/error.middlware');

const app = express();
app.use(express.json());
app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));

// serve uploads (static)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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
