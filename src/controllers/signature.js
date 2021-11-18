/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
import connection from '../database/database.js';

async function postSignature(req, res) {
  const { auth } = req.headers;
  const token = auth?.split('Bearer ')[1];

  try {
    const session = await connection.query(`
        SELECT * FROM sessions WHERE "token" = $1
    `, [token]);

    const userId = session.rows[0].user_id;
    console.log(userId);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}
export {
  postSignature,
};
