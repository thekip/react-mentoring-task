import { MovieItemModel } from '../../movie-item.model';
import { movies } from '../../movies-db';

export type MovieCollection = ReadonlyArray<MovieItemModel>;

export function movieReducer(state: MovieCollection = movies, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
