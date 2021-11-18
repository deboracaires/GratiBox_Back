/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import connection from '../database/database.js';

async function authorization(req, res, next) {
  const { auth } = req.headers;
  const token = auth?.split('Bearer ')[1];

  try {
    const session = await connection.query('SELECT * FROM sessions WHERE "token" = $1', [token]);

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
