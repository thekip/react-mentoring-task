import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import { moviesReceived } from './movies.actions';
import { SortingKinds } from '../reducers/search.reducer';

export enum SearchActions {
  searchStarted = 'Search Started',
  searchByChanged = 'Search by Changed',
  queryChanged = 'Search Query Changed',
  sortingChanged = 'Search Sorting Changed',
}

export function searchStarted() {
  return {
    type: SearchActions.searchStarted,
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

    return fetch(`/api/search/${state.search.searchBy}/${state.search.query}`)
      .then((res) => res.json())
      .then((data) => dispatch(moviesReceived(data)));
  };
}
