import { RadioGroupOption } from '../common/radio-group/radio-group.component';
import { MovieItemModel } from '../../movie-item.model';

export interface SearchState {
  sortingOptions: RadioGroupOption[];
  sorting: RadioGroupOption;
  searchBy: string;
  movies: MovieItemModel[];
}

const sortingOptions: RadioGroupOption[] = [
  {value: 'releaseYear', name: 'release date'},
  {value: 'rating', name: 'rating'},
];

const initialState: SearchState = {
  sortingOptions,
  sorting: sortingOptions[0],
  searchBy: 'name',
  movies: [],
};

export function searchReducer(state: SearchState = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
