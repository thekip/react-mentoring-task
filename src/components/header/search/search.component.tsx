import React, { Component } from 'react';
import styles from './search.scss';
import { RadioGroupComponent } from '../../common/radio-group/radio-group.component';

export class SearchComponent extends Component {
  public render() {
    return (
      <div className={styles.host}>
        <h2 className={styles.heading}>Find your movie</h2>
        <form>
          <input type='text' name='search' className={styles.input}/>
          <div className={styles.actionsRow}>
            <RadioGroupComponent/>
            <button className={styles.submitBtn} type='submit'>Search</button>
          </div>
        </form>
      </div>
    );
  }
}
