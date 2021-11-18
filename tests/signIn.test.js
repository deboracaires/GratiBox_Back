/* eslint-disable no-undef */
import '../src/setup.js';
import supertest from 'supertest';
import connection from '../src/database/database.js';
import app from '../src/app.js';
import { createUser, invalidUser, fakeUser } from './factories/userFactory.js';

describe('POST /sign-in', () => {
  beforeAll(async () => {
    connection.query('DELETE FROM users');
    connection.query('DELETE FROM sessions');
  });
  it('returns with status 200 when session is created', async () => {
    const user = await createUser();
    const response = await supertest(app).post('/sign-in').send({ email: user.email, password: user.password });
    expect(response.status).toEqual(200);
  });
  it('returns with status 400 when requested params ate invalid', async () => {
    const user = await invalidUser();
    const response = await supertest(app).post('/sign-in').send({ email: user.email, password: user.password });
    expect(response.status).toEqual(400);
  });
  it('returns with status 404 when requested email is not found', async () => {
    const user = await fakeUser();
    const response = await supertest(app).post('/sign-in').send({ email: user.email, password: user.password });
    expect(response.status).toEqual(404);
  });
  it('returns with status 401 when requested password is wrong', async () => {
    const user = await createUser();
    const response = await supertest(app).post('/sign-in').send({ email: user.email, password: '12345' });
    expect(response.status).toEqual(401);
  });
});
