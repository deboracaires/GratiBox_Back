/* eslint-disable import/prefer-default-export */
import joi from 'joi';

const userLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(5).required(),
});

export {
  userLoginSchema,
};
