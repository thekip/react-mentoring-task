import React, { Component } from 'react';
import styles from './footer.scss';

export class FooterComponent extends Component {
  public render() {
    return (
      <footer className={styles.host}>
        <span className={styles.logo}>netflixroulette</span>
      </footer>
    );
  }
}
