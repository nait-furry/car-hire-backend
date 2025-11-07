const request = require('supertest');
const app = require('../src/server'); // Adjust the path if necessary
const { sequelize } = require('../src/config/database');
const Car = require('../src/models/car.model');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset the database before tests
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection after tests
});

describe('Car Management API', () => {
  let carId;

  it('should create a new car', async () => {
    const response = await request(app)
      .post('/api/cars')
      .send({
        title: 'Test Car',
        description: 'A car for testing purposes',
        pricePerDay: 100,
        category: 'SUV',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    carId = response.body.id; // Store the car ID for later tests
  });

  it('should retrieve a list of cars', async () => {
    const response = await request(app).get('/api/cars');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should retrieve a specific car by ID', async () => {
    const response = await request(app).get(`/api/cars/${carId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', carId);
  });

  it('should update a car', async () => {
    const response = await request(app)
      .put(`/api/cars/${carId}`)
      .send({
        title: 'Updated Test Car',
        description: 'An updated car for testing purposes',
        pricePerDay: 120,
        category: 'SUV',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Test Car');
  });

  it('should delete a car', async () => {
    const response = await request(app).delete(`/api/cars/${carId}`);

    expect(response.status).toBe(204);
  });

  it('should return 404 for a deleted car', async () => {
    const response = await request(app).get(`/api/cars/${carId}`);

    expect(response.status).toBe(404);
  });
});