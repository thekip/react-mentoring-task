import * as express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(3000,  () => {
  // tslint:disable-next-line no-console
  console.log('Movie app backend is listening on port 3000!');
});
