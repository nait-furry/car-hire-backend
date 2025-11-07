"Replicated in  ../db.js, ../server.js ../auth.routes.middleware.controller.js"

const dotenv = require('dotenv');
console.log("config/index being used as the db-config file;");

dotenv.config();

const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    host: process.env.DB_HOST || localhost,
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME || car_hire_db,
    user: process.env.DB_USER || car_user,
    password: process.env.DB_PASS || password,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
  },
};

module.exports = config;

