const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');


const Car = sequelize.define('Car', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  pricePerDay: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  imagePath: {
    type: DataTypes.STRING, // relative path to uploads/
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'cars',
  timestamps: true, // adds createdAt and updatedAt fields
});

module.exports = Car;