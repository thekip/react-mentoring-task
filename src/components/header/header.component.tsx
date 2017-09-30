import React, { Component } from 'react';
import styles from './header.scss';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { withRouter } from 'react-router';

const SearchBarComponentWithRouter = withRouter(SearchBarComponent);

export class HeaderComponent extends Component {
  public render() {
    return (
      <header className={styles.host}>
        <SearchBarComponentWithRouter/>
      </header>
    );
  }
}
