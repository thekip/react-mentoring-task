import React, { Component } from 'react';
import styles from './header.scss';

export class HeaderComponent extends Component {
  public render() {
    return (
      <header className={styles.host}>
        {this.props.children}
      </header>
    );
  }
}
