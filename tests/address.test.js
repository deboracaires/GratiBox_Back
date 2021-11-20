/* eslint-disable no-undef */
import '../src/setup.js';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import connection from '../src/database/database.js';
import app from '../src/app.js';

const user = {
  name: 'testeadress',
  email: 'testeadress@teste.com',
  password: 'teste',
};
const token = 'token';
const validBody = {
  complement: 'aaaaaaaaaaaaaaa',
  cep: '123456788',
  city_name: 'São paulo',
  state_name: 'DF',
};
let createdUser = [];
describe('post /address', () => {
  beforeAll(async () => {
    connection.query('DELETE FROM users');
    connection.query('DELETE FROM sessions');
    connection.query('DELETE FROM address');
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    createdUser = await connection.query(`
          INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *
        `, [user.name, user.email, hashedPassword]);
    await connection.query(`
            INSERT INTO sessions ("user_id", token) VALUES ($1, $2)
        `, [createdUser.rows[0].id, token]);
  });
  it('returns with status 201 when the address is registered', async () => {
    const headers = `Bearer ${token}`;
    const response = await supertest(app).post('/address').send(validBody).set('Authorization', headers);
    expect(response.status).toEqual(201);
  });
  it('returns with status 409 when the address is already registered', async () => {
    const headers = `Bearer ${token}`;
    await connection.query(`
        INSERT INTO address ("user_id", "complement", "cep", "city_name", "state_name") 
    VALUES ($1, $2, $3, $4, $5)
  `, [createdUser.rows[0].id, validBody.complement, validBody.cep, validBody.state_name, validBody.city_name]);
    const response = await supertest(app).post('/address').send(validBody).set('Authorization', headers);
    expect(response.status).toEqual(409);
  });
});
