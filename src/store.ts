import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { searchReducer, SearchState } from './reducers/search.reducer';
import { MovieCollection, movieReducer } from './reducers/movies.reducer';

export interface AppState {
  readonly search: SearchState;
  readonly movies: MovieCollection;
}

const ottApp = combineReducers<AppState>({
  search: searchReducer,
  movies: movieReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore<AppState>(ottApp,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
  )),
);
