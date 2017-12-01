import { Request, Response } from 'express';
import { MovieItemModel } from '../../../shared/movie-item.model';
import { movies as db } from '../movies-db';
import { app } from '../app';

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
