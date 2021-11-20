/* eslint-disable quotes */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import connection from '../database/database.js';

async function authorization(req, res, next) {
  // eslint-disable-next-line dot-notation
  const auth = req.headers['authorization'];
  const token = auth?.replace('Bearer ', '');

  try {
    const session = await connection.query(`SELECT * FROM sessions WHERE "token" = $1`, [token]);

    if (session.rowCount === 0) {
      return res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
  next();
}

export {
  authorization,
};
