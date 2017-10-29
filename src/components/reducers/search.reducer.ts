import { SearchActions } from '../actions/search.actions';

export type SortingKinds = 'releaseYear' | 'rating';

export interface SearchState {
  readonly sorting: SortingKinds;
  readonly searchBy: string;
  readonly query: string;
}

const initialState: SearchState = {
  sorting: 'releaseYear',
  searchBy: 'name',
  query: '',
};

export function searchReducer(state: SearchState = initialState, action: any) {
  switch (action.type) {
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
