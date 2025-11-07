const { sequelize } = require('../db');
const { User, Car, Booking } = require('../models/index');
const bcrypt = require('bcryptjs');

async function seedData() {
  try {
    console.log('🌱 Starting database seeding...');

    await sequelize.sync({ force: true }); // WARNING: This clears existing data!

    // --- Users ---
    const passwordHash = await bcrypt.hash('password123', 10);
    const users = await User.bulkCreate([
      { name: 'Alice Johnson', email: 'alice@example.com', passwordHash },
      { name: 'Bob Smith', email: 'bob@example.com', passwordHash },
      { name: 'Admin User', email: 'admin@example.com', passwordHash, role: 'admin' },
    ]);
    console.log(`✅ Seeded ${users.length} users.`);

    // --- Cars ---
    const cars = await Car.bulkCreate([
      {
        title: 'Toyota Corolla',
        description: 'Reliable compact car, great fuel economy.',
        pricePerDay: 50.00,
        category: 'Sedan',
        imagePath: 'uploads/toyota-corolla.jpg',
        available: true,
      },
      {
        title: 'Tesla Model 3',
        description: 'Electric car with autopilot and long range.',
        pricePerDay: 120.00,
        category: 'Electric',
        imagePath: 'uploads/tesla-model3.jpg',
        available: true,
      },
      {
        title: 'Ford Ranger',
        description: 'Strong pickup truck ideal for off-road and cargo.',
        pricePerDay: 90.00,
        category: 'Truck',
        imagePath: 'uploads/ford-ranger.jpg',
        available: false,
      },
    ]);
    console.log(`✅ Seeded ${cars.length} cars.`);

    // --- Bookings ---
    const bookings = await Booking.bulkCreate([
      {
        userId: users[0].id,
        carId: cars[0].id,
        startDate: new Date('2025-11-01'),
        endDate: new Date('2025-11-03'),
        totalPrice: 150.00,
        status: 'confirmed',
      },
      {
        userId: users[1].id,
        carId: cars[1].id,
        startDate: new Date('2025-11-05'),
        endDate: new Date('2025-11-10'),
        totalPrice: 600.00,
        status: 'pending',
      },
    ]);
    console.log(`✅ Seeded ${bookings.length} bookings.`);

    console.log('🎉 Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
