import React, { PureComponent } from 'react';
import styles from './header.scss';

export class HeaderComponent extends PureComponent {
  public render() {
    return (
      <header className={styles.host}>
        {this.props.children}
      </header>
    );
  }
}
