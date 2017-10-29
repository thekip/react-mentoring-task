import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { searchReducer, SearchState } from './reducers/search.reducer';
import { detailsReducer, DetailsState } from './reducers/details.reducer';

export interface AppState {
  readonly search: SearchState;
  readonly details: DetailsState;
}

const ottApp = combineReducers<AppState>({
  search: searchReducer,
  details: detailsReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore<AppState>(ottApp,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
  )),
);
