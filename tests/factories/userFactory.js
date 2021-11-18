/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import faker from 'faker';
import bcrypt from 'bcrypt';
import connection from '../../src/database/database';

export async function fakeUser() {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: '123456',
    hashedPassword: bcrypt.hashSync('123456', 10),
  };
  return user;
}

export async function invalidUser() {
  const user = {
    name: 'a',
    email: 'a',
    password: '123456',
    hashedPassword: bcrypt.hashSync('123456', 10),
  };
  return user;
}

export async function createUser() {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: '123456',
    hashedPassword: bcrypt.hashSync('123456', 10),
  };

  const insertedUser = await connection.query(`
      INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *
    `, [user.name, user.email, user.hashedPassword]);

  user.id = insertedUser.rows[0].id;

  return user;
}
