import * as express from 'express';

export const app = express();

app.listen(3000, () => {
  // tslint:disable-next-line no-console
  console.log('Movie app backend is listening on port 3000!');
});
