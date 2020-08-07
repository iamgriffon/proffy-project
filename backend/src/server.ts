import express from 'express';
import routes from './routes';
import cors from 'cors';
import hashPassword from './utils/hashPassword';
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);
