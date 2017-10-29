import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';
import { SortingKinds } from '../reducers/search.reducer';
import { MoviesApi } from '../api/movies.api';
import { MovieCollection } from '../../shared/movie-item.model';

export enum SearchActions {
  searchStarted = '[Search] Search Started',
  searchReceived = '[Search] Search Received',
  searchByChanged = '[Search] Search by Changed',
  queryChanged = '[Search] Search Query Changed',
  sortingChanged = '[Search] Search Sorting Changed',
}

export function searchStarted() {
  return {
    type: SearchActions.searchStarted,
  };
}

export function searchReceived(movies: MovieCollection) {
  return {
    type: SearchActions.searchReceived,
    movies,
  };
}

export function searchByChanged(searchBy: string) {
  return {
    type: SearchActions.searchByChanged,
    searchBy,
  };
}

export function searchQueryChanged(query: string) {
  return {
    type: SearchActions.queryChanged,
    query,
  };
}

export function searchSortingChanged(sorting: SortingKinds) {
  return {
    type: SearchActions.sortingChanged,
    sorting,
  };
}
export function performSearch(): ThunkAction<Promise<any>, AppState, void> {
  return (dispatch, getState) => {
    dispatch(searchStarted());

    const state = getState();

    return MoviesApi.searchMovies(state.search.searchBy, state.search.query)
      .then((data) => dispatch(searchReceived(data)));
  };
}
