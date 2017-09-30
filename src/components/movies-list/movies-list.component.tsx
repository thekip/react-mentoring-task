import React, { Component } from 'react';
import styles from './movies-list.scss';
import { MoviesItemComponent } from './movie-item/movie-item.component';
import { movies } from './movies-db';
import { RadioGroupComponent, RadioGroupOption } from '../common/radio-group/radio-group.component';

export class MoviesListComponent extends Component {
  private sortingOptions: RadioGroupOption[] = [
    { value: 'releaseDate', name: 'release date' },
    { value: 'rating', name: 'rating' },
  ];

  public state = {
    items: movies,
    sortingOptions: this.sortingOptions,
    sorting: this.sortingOptions[0],
  };

  private handleSortingChange(sorting: RadioGroupOption) {
    this.setState({sorting});
  }

  private renderMovies() {
    return (
      <div className={styles.host}>
        <div className={styles.header}>
          <span className={styles.total}>
            {this.state.items.length} movies found
          </span>
          <div className={styles.sorting}>
            <span>Sort by</span>
            <RadioGroupComponent
              options={this.state.sortingOptions}
              selected={this.state.sorting}
              onSelect={this.handleSortingChange.bind(this)}
            />
          </div>
        </div>
        <div className={styles.list}>
          {this.state.items.map((item) => (
            <MoviesItemComponent item={ item } key={ item.id } />
          ))}
        </div>
      </div>
    );
  }

  private renderEmptyState() {
    return (
      <div className={styles.host}>
        <div className={styles.header}/>
        <div className={styles.emptyState}>
          No films found
        </div>
      </div>
    );
  }

  public render() {
    return this.state.items.length
      ? this.renderMovies()
      : this.renderEmptyState();
  }
}
