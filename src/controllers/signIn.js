/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../database/database.js';
import { userLoginSchema } from '../schemmas/userLoginSchema.js';

async function signIn(req, res) {
  try {
    const {
      email,
      password,
    } = req.body;

    // eslint-disable-next-line prefer-destructuring
    const error = userLoginSchema.validate({
      email,
      password,
    }).error;

    if (error) {
      return res.sendStatus(400);
    }

    const user = await connection.query(`
        SELECT * FROM users WHERE email = $1
    `, [email]);

    if (user.rowCount === 0) {
      return res.sendStatus(404);
    }

    const encryptedPassword = user.rows[0].password;
    const isValid = bcrypt.compareSync(password, encryptedPassword);

    if (!isValid) {
      return res.sendStatus(401);
    }

    const token = uuid();

    // eslint-disable-next-line prefer-destructuring
    const name = user.rows[0].name;

    const session = await connection.query(`
        SELECT * FROM sessions WHERE "user_id"=$1
    `, [user.rows[0].id]);

    if (session.rowCount === 0) {
      await connection.query(`
        INSERT INTO sessions ("user_id", token) VALUES ($1, $2)
    `, [user.rows[0].id, token]);

      return res.send({ name, token }).status(201);
    }

    await connection.query(`
        UPDATE sessions SET "token"= $2 WHERE id=$1
    `, [session.rows[0].id, token]);

    return res.send({ name, token }).status(201);
  } catch (err) {
    res.sendStatus(500);
  }
}
export {
  signIn,
};
