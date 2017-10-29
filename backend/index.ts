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
  const sortingKey = ['releaseYear', 'rating'].includes(req.query.sortBy) ? req.query.sortBy : 'rating';

  if (req.params.query) {
    return res.send(getMovies(req.params.query, searchKey, sortingKey));
  }

  return res.send([]);
});

function getMovies(query: string,
                   searchKey: keyof MovieItemModel,
                   sortingKey: keyof MovieItemModel): MovieItemModel[] {
  return db
    .filter((movie) => (movie[searchKey] as string).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (a[sortingKey] as number) - (b[sortingKey] as number));
}

app.listen(3000, () => {
  // tslint:disable-next-line no-console
  console.log('Movie app backend is listening on port 3000!');
});
