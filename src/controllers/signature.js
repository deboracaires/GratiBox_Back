/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';
import connection from '../database/database.js';
import registerDeliveries from './deliveries.js';
import { signatureSchema } from '../schemmas/signatureSchema.js';

async function postSignature(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
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

async function getSignature(req, res) {
  // eslint-disable-next-line dot-notation
  const auth = req.headers['authorization'];
  const token = auth?.replace('Bearer ', '');

  try {
    const session = await connection.query(`
        SELECT * FROM sessions WHERE "token" = $1
    `, [token]);

    const userId = session.rows[0].user_id;

    const signature = await connection.query(`
        SELECT signatures.id, signatures."signature_date", plan.name, signatures."delivery_plan_id", signatures."signature_date"
        FROM signatures
        INNER JOIN plan
        ON signatures."plan_id"=plan.id
        WHERE "user_id"=$1
    `, [userId]);

    if (signature.rowCount === 0) {
      return res.sendStatus(404);
    }
    const {
      signature_date,
      name,
      delivery_plan_id,
    } = signature.rows[0];

    const plan_name = name;

    const deliveryName = await connection.query(`
        SELECT * FROM "delivery_plan" WHERE id = $1
    `, [delivery_plan_id]);

    const delivery_plan = deliveryName.rows[0].name;

    const signatureProducts = await connection.query(`
        SELECT * FROM "signature_products" WHERE "signature_id"=$1
    `, [signature.rows[0].id]);

    const products_id = [];
    for (let i = 0; i < signatureProducts.rowCount; i += 1) {
      products_id.push(signatureProducts.rows[i].product_id);
    }
    const products = [];
    for (let i = 0; i < products_id.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const productName = await connection.query(`
        SELECT * FROM products WHERE id=$1
    `, [products_id[i]]);

      products.push(productName.rows[0].name);
    }

    const deliveries = await connection.query(`
      SELECT * FROM deliveries WHERE "user_id" = $1 ORDER BY id ASC
    `, [userId]);

    const nowDate = dayjs().format('MM/DD/YYYY');

    for (let i = 0; i < deliveries.rows.length; i += 1) {
      if (dayjs(deliveries.rows[i].date).isBefore(nowDate)) {
        await connection.query(`
          UPDATE deliveries SET "delivered" = $2 WHERE id = $1
        `, [deliveries.rows[i].id, true]);
      }
    }

    let dates = [];
    const greaterDates = [];
    dates = registerDeliveries(nowDate, delivery_plan, plan_name);
    let lastDateRegistered = '';
    if (deliveries.rows.length !== 0) {
      lastDateRegistered = dayjs(deliveries.rows[(deliveries.rows.length) - 1].date).format('MM/DD/YYYY');
      for (let i = 0; i < dates.length; i += 1) {
        if (dayjs(lastDateRegistered).isBefore(dayjs(dates[i]).format('MM/DD/YYYY'))) {
          greaterDates.push(dates[i]);
        }
      }
    } else {
      for (let i = 0; i < dates.length; i += 1) {
        const parcial = dayjs(dates[i]).format('MM/DD/YYYY');
        greaterDates.push(parcial);
      }
    }

    for (let i = 0; i < greaterDates.length; i += 1) {
      await connection.query(`
        INSERT INTO deliveries ("user_id", date, "delivered") VALUES ($1, $2, $3);
      `, [userId, greaterDates[i], false]);
    }

    const allDeliveries = await connection.query(`
      SELECT date, delivered, id
      FROM deliveries 
      WHERE "user_id" = $1 ORDER BY id ASC
    `, [userId]);

    const repetedDeliveries = [];
    for (let i = 0; i < allDeliveries.rows.length; i += 1) {
      for (let j = i + 1; j < allDeliveries.rows.length; j += 1) {
        if (dayjs(allDeliveries.rows[i].date).isSame(allDeliveries.rows[j].date)) {
          repetedDeliveries.push(allDeliveries.rows[j].id);
        }
      }
    }
    // eslint-disable-next-line arrow-body-style
    const filtered = repetedDeliveries.filter((el, i) => {
      return repetedDeliveries.indexOf(el) === i;
    });
    for (let i = 0; i < filtered.length; i += 1) {
      await connection.query(`
        DELETE FROM deliveries WHERE id = $1
      `, [filtered[i]]);
    }
    const filteredDeliveries = await connection.query(`
      SELECT date, delivered, id
      FROM deliveries 
      WHERE "user_id" = $1 ORDER BY id ASC
    `, [userId]);

    const delivery_history = filteredDeliveries.rows;

    res.send({
      plan_name,
      signature_date,
      delivery_plan,
      products,
      delivery_history,
    });
  } catch (err) {
    return res.sendStatus(500);
  }
}
export {
  postSignature,
  getSignature,
};
