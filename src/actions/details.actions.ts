import { MovieCollection, MovieItemModel } from '../../shared/movie-item.model';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';
import { MoviesApi } from '../api/movies.api';

export enum DetailsActions {
  moviesReceived = '[Details] Movies (*) received',
  movieReceived = '[Details] Movies (1) received',
  moviesLoadingStarted = '[Details] Movies (*) loading started',
  movieLoadingStarted = '[Details] Movie (1) loading started',
}

export function movieReceived(movie: MovieItemModel) {
  return {
    type: DetailsActions.movieReceived,
    movie,
  };
}

export function moviesReceived(movies: MovieCollection) {
  return {
    type: DetailsActions.moviesReceived,
    movies,
  };
}

export function movieLoadingStarted() {
  return {
    type: DetailsActions.movieLoadingStarted,
  };
}

export function moviesLoadingStarted() {
  return {
    type: DetailsActions.moviesLoadingStarted,
  };
}

export function loadMovie(movieName: string): ThunkAction<Promise<MovieItemModel>, AppState, void> {
  return (dispatch) => {
    dispatch(movieLoadingStarted());

    return MoviesApi.getMovie(movieName)
      .then((data) => {
        dispatch(movieReceived(data));
        return data;
      });
  };
}

export function loadRelatedMovies(directorName: string): ThunkAction<Promise<any>, AppState, void> {
  return (dispatch) => {
    dispatch(movieLoadingStarted());

    return MoviesApi.searchMovies('director', directorName)
      .then((data) => dispatch(moviesReceived(data)));
  };
}
