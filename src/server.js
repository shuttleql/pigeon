import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(bodyParser.text());

app.use('/', routes);

const server = app.listen(process.env.PORT || 9001, () => {
  const {address, port} = server.address();

  console.log(`Pigeon running on http://${address}:${port}`);
});
