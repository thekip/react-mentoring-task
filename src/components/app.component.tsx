import React, { Component } from 'react';
import { SearchComponent } from './search/search.component';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { MoviePageComponent } from './movie/movie.component';

export class App extends Component {
  public render() {
    return (
      <Router>
        <Switch>
          <Route path='/search/:query' component={SearchComponent}/>
          <Route path='/film/:name' component={MoviePageComponent}/>
          <Route path='/' component={SearchComponent}/>
        </Switch>
      </Router>
    );
  }
}
