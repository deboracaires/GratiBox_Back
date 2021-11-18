/* eslint-disable import/prefer-default-export */
import joi from 'joi';

const signatureSchema = joi.object({
  plan_id: joi.number().integer().required(),
  delivery_plan_id: joi.number().integer().required(),
  signature_date: joi.date().required(),
  products: joi.array().min(1).max(3).required(),
});

export {
  signatureSchema,
};
