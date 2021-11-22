/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import connection from '../database/database.js';
import { addressSchema } from '../schemmas/addressSchema.js';

function removeAcents(str) {
  const com_acento = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ';

  const sem_acento = 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr';
  let novastr = '';
  let troca = false;
  for (let i = 0; i < str.length; i += 1) {
    troca = false;
    for (let j = 0; j < com_acento.length; j += 1) {
      if (str.substr(i, 1) === com_acento.substr(j, 1)) {
        novastr += sem_acento.substr(j, 1);
        troca = true;
        break;
      }
    }
    if (troca === false) {
      novastr += str.substr(i, 1);
    }
  }
  return novastr;
}

async function postAdress(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://grati-box-front-six.vercel.app/');
  // eslint-disable-next-line dot-notation
  const auth = req.headers['authorization'];
  const token = auth?.replace('Bearer ', '');

  try {
    const session = await connection.query(`
        SELECT * FROM sessions WHERE "token" = $1
    `, [token]);

    const userId = session.rows[0].user_id;

    const verifyAddress = await connection.query(`
      SELECT * FROM address WHERE "user_id" = $1
    `, [userId]);

    if (verifyAddress.rowCount !== 0) {
      res.sendStatus(409);
    }
    const {
      complement,
      cep,
      city_name,
      state_name,
    } = req.body;

    const error = addressSchema.validate(req.body).error;

    if (error) {
      res.sendStatus(400);
    }

    const verifyState = await connection.query(`
        SELECT * FROM state WHERE name = $1
    `, [state_name]);

    if (verifyState.rowCount === 0) {
      res.sendStatus(404);
    }

    const cityName = removeAcents(city_name).toLowerCase();

    const verifyCity = await connection.query(`
    SELECT * FROM city WHERE name = $1
  `, [cityName]);

    if (verifyCity.rowCount === 0) {
      await connection.query(`
        INSERT INTO CITY (name) VALUES ($1) RETURNING *
      `, [cityName]);
    }

    await connection.query(`
      INSERT INTO address ("user_id", "complement", "cep", "city_name", "state_name") 
      VALUES ($1, $2, $3, $4, $5)
    `, [userId, complement, cep, cityName, state_name]);

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export {
  postAdress,
};
