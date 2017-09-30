import React, { Component } from 'react';
import { SearchComponent } from './search/search.component';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';

export class App extends Component {
  public render() {
    return (
      <Router>
        <div>
          <Route path='/' component={SearchComponent}/>
          <Route path='search/' component={SearchComponent}/>
        </div>
      </Router>
    );
  }
}
