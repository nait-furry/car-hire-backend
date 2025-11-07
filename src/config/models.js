const User = require('../models/user.models');
const Car = require('../models/car.models');
const Booking = require('../models/booking.models');

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Car.hasMany(Booking, { foreignKey: 'carId' });
Booking.belongsTo(Car, { foreignKey: 'carId' });

module.exports = { User, Car, Booking };
