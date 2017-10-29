import React, { Component } from 'react';
import { SearchContainer } from './search/search.component';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { MoviePageContainer } from './movie/movie.component';
import { Provider } from 'react-redux';
import { store } from '../store';

export class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/search/:query' component={SearchContainer}/>
            <Route path='/film/:name' component={MoviePageContainer}/>
            <Route path='/' component={SearchContainer}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}
