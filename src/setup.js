import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'prod' ? '.env.test' : '.env';

dotenv.config({
  path: envFile,
});
