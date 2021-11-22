/* eslint-disable no-undef */
import '../src/setup.js';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import connection from '../src/database/database.js';
import app from '../src/app.js';

const user = {
  name: 'teste',
  email: 'teste@teste.com',
  password: 'teste',
};
const token = 'token';

const validBody = {
  plan_id: '1',
  delivery_plan_id: '4',
  signature_date: '11/18/2021',
  products: [1, 3],
};

const invalidBody = {};
describe('POST /signature', () => {
  beforeAll(async () => {
    connection.query('DELETE FROM users');
    connection.query('DELETE FROM sessions');
    connection.query('DELETE FROM signatures');
    connection.query('DELETE FROM deliveries');
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const createdUser = await connection.query(`
      INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *
    `, [user.name, user.email, hashedPassword]);
    await connection.query(`
        INSERT INTO sessions ("user_id", token) VALUES ($1, $2)
    `, [createdUser.rows[0].id, token]);
  });
  it('returns with status 201 when signature is created', async () => {
    const headers = `Bearer ${token}`;
    const response = await supertest(app).post('/signature').send(validBody).set('Authorization', headers);
    expect(response.status).toEqual(201);
  });
  it('returns with status 401 when token is invalid', async () => {
    const response = await supertest(app).post('/signature').send(validBody).set('Authorization', ' ');
    expect(response.status).toEqual(401);
  });
  it('returns with status 409 when the user already have a signature registered', async () => {
    const headers = `Bearer ${token}`;
    await supertest(app).post('/signature').send(validBody).set('Authorization', headers);
    const response = await supertest(app).post('/signature').send(validBody).set('Authorization', headers);
    expect(response.status).toEqual(409);
  });
  it('returns with status 400 when signature is requested with invalid body', async () => {
    const headers = `Bearer ${token}`;
    await connection.query('DELETE FROM signatures');
    const response = await supertest(app).post('/signature').send(invalidBody).set('Authorization', headers);
    expect(response.status).toEqual(400);
  });
});

describe('get /signature', () => {
  beforeAll(async () => {
    connection.query('DELETE FROM users');
    connection.query('DELETE FROM sessions');
    connection.query('DELETE FROM signatures');
    connection.query('DELETE FROM deliveries');
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const createdUser = await connection.query(`
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *
      `, [user.name, user.email, hashedPassword]);
    await connection.query(`
          INSERT INTO sessions ("user_id", token) VALUES ($1, $2)
      `, [createdUser.rows[0].id, token]);
  });
  it('returns with status 404 when the user does not have an signature registered', async () => {
    const headers = `Bearer ${token}`;
    const response = await supertest(app).get('/signature').set('Authorization', headers);
    expect(response.status).toEqual(404);
  });
});
