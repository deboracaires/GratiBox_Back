/* eslint-disable import/prefer-default-export */
import joi from 'joi';

const newUserSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(5).required(),
});

export {
  newUserSchema,
};
