import React, { Component } from 'react';
import styles from './header.scss';
import { SearchBarComponent } from './search-bar/search-bar.component';

export class HeaderComponent extends Component {
  public render() {
    return (
      <header className={styles.host}>
        <SearchBarComponent/>
      </header>
    );
  }
}
