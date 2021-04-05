import express from 'express';
import { config as dotenv } from 'dotenv';
import * as path from 'path';
import { addUserRoutes } from './users/index';
import { validationErrorHandler } from './middleware';

dotenv({
  path: path.resolve('../.env'),
});

const app = express();
const port = process.env.SRV_PORT;

app.use(express.json());

addUserRoutes(app);

app.use(validationErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
