import React, { Component } from 'react';
import styles from './search.scss';
import { RadioGroupComponent, RadioGroupOption } from '../../common/radio-group/radio-group.component';

export class SearchComponent extends Component {
  private searchByOptions: RadioGroupOption[] = [
    { value: 'title', name: 'Title' },
    { value: 'director', name: 'Director' },
  ];

  public state = {
    searchByOptions: this.searchByOptions,
    searchBy: this.searchByOptions[0],
  };

  private handleSelectSearchBy(searchBy: RadioGroupOption) {
    this.setState({searchBy});
  }

  public render() {
    return (
      <div className={styles.host}>
        <h2 className={styles.heading}>Find your movie</h2>
        <form>
          <input type='text' placeholder='Kill Bill 2' name='search' className={styles.input}/>
          <div className={styles.actionsRow}>
            <span>Search by</span>
            <RadioGroupComponent
              selected={this.state.searchBy}
              options={this.state.searchByOptions}
              onSelect={this.handleSelectSearchBy.bind(this)}
            />
            <button className={styles.submitBtn} type='submit'>Search</button>
          </div>
        </form>
      </div>
    );
  }
}
