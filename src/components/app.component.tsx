import React, { Component } from 'react';
import styles from './app.scss';
import { HeaderComponent } from './header/header.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { FooterComponent } from './footer/footer.component';

export class App extends Component {
  public render() {
    return (
      <div className={styles.wrap}>
        <HeaderComponent/>
        <div className={styles.content}>
          <MoviesListComponent/>
        </div>
        <FooterComponent/>
      </div>
    );
  }
}
