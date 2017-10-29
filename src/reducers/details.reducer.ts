import { MovieCollection, MovieItemModel } from '../../shared/movie-item.model';
import { DetailsActions } from '../actions/details.actions';

export interface DetailsState {
  readonly related: MovieCollection;
  readonly movie: Readonly<MovieItemModel>;
}

const initialState: DetailsState = {
  related: [],
  movie: null,
};

export function detailsReducer(state: DetailsState = initialState, action: any): DetailsState {
  switch (action.type) {
    case DetailsActions.movieReceived:
      return {...state, movie: action.movie};
    case DetailsActions.moviesReceived:
      return {...state, related: action.movies};
    default:
      return state;
  }
}
