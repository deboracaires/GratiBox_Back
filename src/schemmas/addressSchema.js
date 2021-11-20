/* eslint-disable import/prefer-default-export */
import joi from 'joi';

const addressSchema = joi.object({
  complement: joi.string().min(3).max(50).required(),
  cep: joi.string().min(4).max(10).required(),
  city_name: joi.string().max(20).required(),
  state_name: joi.string().max(2).required(),
});

export {
  addressSchema,
};
