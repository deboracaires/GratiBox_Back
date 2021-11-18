/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import { newUserSchema } from '../schemmas/newUserSchema.js';

async function signUp(req, res) {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    // eslint-disable-next-line prefer-destructuring
    const error = newUserSchema.validate({
      name,
      email,
      password,
    }).error;

    if (error) {
      return res.sendStatus(400);
    }

    const existingUser = await connection.query(`
        SELECT * FROM users WHERE email = $1
    `, [email]);

    if (existingUser.rowCount !== 0) {
      return res.sendStatus(409);
    }

    const hashPassword = bcrypt.hashSync(password, 12);

    await connection.query(`
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
    `, [name, email, hashPassword]);

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}
export {
  signUp,
};
