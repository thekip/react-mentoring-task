import * as express from 'express';
import { Request, Response } from 'express';
import { movies as db } from './movies-db';
import { MovieItemModel } from './movie-item.model';

const app = express();

app.get('/', (_req, res) => {
  res.send(`
    <img alt="Nothing to do here"
    src="http://i0.kym-cdn.com/photos/images/newsfeed/000/203/742/nothing_to_do_here_by_rober_raik-d4cxltj.png">
`);
});

app.get('/search/:searchBy/:query', (req: Request, res: Response) => {
  const searchKey = ['name', 'director'].includes(req.params.searchBy) ? req.params.searchBy : 'name';

  if (req.params.query) {
    return res.send(getMovies(req.params.query, searchKey));
  }

  return res.send([]);
});

app.get('/movie/:name', (req: Request, res: Response) => {
  if (req.params.name) {
    return res.send(getMovie(req.params.name));
  }

  return res.send({});
});
function getMovies(query: string, searchKey: keyof MovieItemModel): MovieItemModel[] {
  return db.filter((movie) =>
    (movie[searchKey] as string).toLowerCase().includes(query.toLowerCase()),
  );
}

function getMovie(name: string): MovieItemModel {
  return db.find((item) =>
    item.name.toLowerCase() === name.toLowerCase(),
  );
}

app.listen(3000, () => {
  // tslint:disable-next-line no-console
  console.log('Movie app backend is listening on port 3000!');
});
