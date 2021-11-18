/* eslint-disable no-undef */
import '../src/setup.js';
import supertest from 'supertest';
import connection from '../src/database/database.js';
import app from '../src/app.js';
import { createUser, fakeUser, invalidUser } from './factories/userFactory.js';

describe('POST /sign-up', () => {
  beforeAll(async () => {
    connection.query('DELETE FROM users');
  });
  it('returns with status 201 when user is created', async () => {
    const user = await fakeUser();
    const response = await supertest(app).post('/sign-up').send({ name: user.name, email: user.email, password: user.password });
    expect(response.status).toEqual(201);
  });
  it('returns with status 409 when email requested is already registred', async () => {
    const user = await createUser();
    const response = await supertest(app).post('/sign-up').send({ name: user.name, email: user.email, password: user.password });
    expect(response.status).toEqual(409);
  });
  it('returns with status 400 when requested with invalid params', async () => {
    const user = await invalidUser();
    const response = await supertest(app).post('/sign-up').send({ name: user.name, email: user.email, password: user.password });
    expect(response.status).toEqual(400);
  });
});
