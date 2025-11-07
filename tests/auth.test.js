const request = require('supertest');
const app = require('../src/server'); // Adjust the path if necessary
const { sequelize } = require('../src/config/database');
const User = require('../src/models/user.model');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset the database before tests
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection after tests
});

describe('Authentication Tests', () => {
  let token;

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.email).toBe('testuser@example.com');
  });

  it('should login the user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.token).toBeDefined();
    token = response.body.token; // Store the token for further tests
  });

  it('should not login with incorrect password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should access a protected route', async () => {
    const response = await request(app)
      .get('/api/protected') // Replace with an actual protected route
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not access a protected route without token', async () => {
    const response = await request(app)
      .get('/api/protected'); // Replace with an actual protected route

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });
});