import React, { Component } from 'react';
import styles from './radio-group.scss';

export class RadioGroupComponent extends Component {
  public render() {
    return (
      <div className={styles.host}>
        <span className={styles.title}>Search by</span>
        <div className={styles.item}>Title</div>
        <div className={styles.item}>Director</div>
      </div>
    );
  }
}
