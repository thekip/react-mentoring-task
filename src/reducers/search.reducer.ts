import { SearchActions } from '../actions/search.actions';
import { SearchByKinds } from '../api/movies.api';
import { MovieCollection } from '../../shared/movie-item.model';

export type SortingKinds = 'releaseYear' | 'rating';

export interface SearchState {
  readonly sorting: SortingKinds;
  readonly searchBy: SearchByKinds;
  readonly query: string;
  readonly movies: MovieCollection;
}

const initialState: SearchState = {
  sorting: 'releaseYear',
  searchBy: 'name',
  query: '',
  movies: [],
};

export function searchReducer(state: SearchState = initialState, action: any) {
  switch (action.type) {
    case SearchActions.searchReceived:
      return {...state, movies: action.movies};
    case SearchActions.searchByChanged:
      return {...state, searchBy: action.searchBy};
    case SearchActions.queryChanged:
      return {...state, query: action.query};
    case SearchActions.sortingChanged:
      return {...state, sorting: action.sorting};
    default:
      return state;
  }
}
