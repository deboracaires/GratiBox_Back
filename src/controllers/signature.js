/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';
import connection from '../database/database.js';
import { signatureSchema } from '../schemmas/signatureSchema.js';

async function postSignature(req, res) {
  // eslint-disable-next-line dot-notation
  const auth = req.headers['authorization'];
  const token = auth?.replace('Bearer ', '');

  try {
    const session = await connection.query(`
        SELECT * FROM sessions WHERE "token" = $1
    `, [token]);

    const userId = session.rows[0].user_id;

    const verifySignature = await connection.query(`
        SELECT * FROM signatures WHERE "user_id"=$1
    `, [userId]);

    if (verifySignature.rowCount !== 0) {
      return res.sendStatus(409);
    }
    const {
      plan_id,
      delivery_plan_id,
      signature_date,
      products,
    } = req.body;

    const error = signatureSchema.validate({
      plan_id,
      delivery_plan_id,
      signature_date,
      products,
    }).error;

    if (error) {
      return res.sendStatus(400);
    }

    const verifyPlan = await connection.query(`
        SELECT * FROM plan WHERE id=$1
    `, [plan_id]);

    const verifyDeliveryPlan = await connection.query(`
        SELECT * FROM delivery_plan WHERE id=$1
    `, [delivery_plan_id]);

    // eslint-disable-next-line max-len
    if (verifyPlan.rowCount === 0 || verifyDeliveryPlan === 0) {
      return res.sendStatus(404);
    }

    for (let i = 0; i < products.length; i += 1) {
      if (products[i + 1]) {
        if (products[i] === products[i + 1]) {
          return res.sendStatus(400);
        }
      }
    }

    if (products.length === 1) {
      const verifyProduct = await connection.query(`
        SELECT * FROM products WHERE id=$1
      `, [products[0]]);

      if (verifyProduct.rowCount === 0) {
        return res.sendStatus(404);
      }
    } else if (products.length === 2) {
      const verifyProduct1 = await connection.query(`
        SELECT * FROM products WHERE id=$1
      `, [products[0]]);

      const verifyProduct2 = await connection.query(`
        SELECT * FROM products WHERE id=$1
      `, [products[1]]);

      if (verifyProduct1.rowCount === 0 || verifyProduct2.rowCount === 0) {
        return res.sendStatus(404);
      }
    } else if (products.length === 3) {
      const verifyProduct1 = await connection.query(`
        SELECT * FROM products WHERE id=$1
      `, [products[0]]);

      const verifyProduct2 = await connection.query(`
        SELECT * FROM products WHERE id=$1
      `, [products[1]]);

      const verifyProduct3 = await connection.query(`
        SELECT * FROM products WHERE id=$1
      `, [products[2]]);

      // eslint-disable-next-line max-len
      if (verifyProduct1.rowCount === 0 || verifyProduct2.rowCount === 0 || verifyProduct3.rowCount === 0) {
        return res.sendStatus(404);
      }
    }

    await connection.query(`
        INSERT INTO signatures ("user_id", "plan_id", "delivery_plan_id", "signature_date") 
        VALUES ($1, $2, $3, $4)
    `, [userId, plan_id, delivery_plan_id, dayjs(signature_date).format('DD/MM/YYYY')]);

    const signature = await connection.query(`
        SELECT * FROM signatures WHERE "user_id" = $1
    `, [userId]);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < products.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await connection.query(`
        INSERT INTO signature_products ("signature_id", "product_id") 
        VALUES ($1, $2)
      `, [signature.rows[0].id, products[i]]);
    }

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}
export {
  postSignature,
};
