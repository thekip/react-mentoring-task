import { MovieCollection } from '../reducers/movies.reducer';

export enum MoviesActions {
  moviesReceived = 'Movies received',
}

export function moviesReceived(movies: MovieCollection) {
  return {
    type: MoviesActions.moviesReceived,
    movies,
  };
}
