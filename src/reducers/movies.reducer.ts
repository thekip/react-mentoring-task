import { MovieItemModel } from '../movie-item.model';
import { MoviesActions } from '../actions/movies.actions';

export type MovieCollection = ReadonlyArray<MovieItemModel>;

export function movieReducer(state: MovieCollection = [], action: any) {
  switch (action.type) {
    case MoviesActions.moviesReceived:
      return action.movies;
    default:
      return state;
  }
}
