import React, { Component } from 'react';
import styles from './header.scss';
import { SearchComponent } from './search/search.component';

export class HeaderComponent extends Component {
  public render() {
    return (
      <header className={styles.host}>
        <SearchComponent/>
      </header>
    );
  }
}
