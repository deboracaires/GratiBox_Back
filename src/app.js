import express from 'express';
import cors from 'cors';
import { signUp } from './controllers/signUp.js';
import { signIn } from './controllers/signIn.js';
import { authorization } from './middlewares/authorization.js';
import { getSignature, postSignature } from './controllers/signature.js';
import { postAdress } from './controllers/address.js';
import { getSignatureData } from './controllers/signatureData.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);
app.post('/signature', authorization, postSignature);
app.post('/address', authorization, postAdress);

app.get('/signature', authorization, getSignature);
app.get('/signature-data', authorization, getSignatureData);

export default app;
