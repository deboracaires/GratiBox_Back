/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import connection from '../database/database.js';

async function getSignatureData(req, res) {
  try {
    const states = await connection.query(`
        SELECT * FROM state
    `);

    const plans = await connection.query(`
        SELECT * FROM plan
    `);

    const products = await connection.query(`
        SELECT * FROM products
    `);

    const delivery_plans = await connection.query(`
        SELECT * FROM delivery_plan
    `);

    const body = {
      states: states.rows,
      plans: plans.rows,
      products: products.rows,
      delivery_plans: delivery_plans.rows,
    };

    res.send(body);
  } catch (err) {
    res.sendStatus(500);
  }
}

export {
  getSignatureData,
};
