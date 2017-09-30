import React, { Component } from 'react';
import styles from './search.scss';
import { HeaderComponent } from '../header/header.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { movies } from '../movies-list/movies-db';
import { RadioGroupComponent, RadioGroupOption } from '../common/radio-group/radio-group.component';
import { LayoutComponent } from '../layout/layout.component';

export class SearchComponent extends Component {
  private sortingOptions: RadioGroupOption[] = [
    {value: 'releaseDate', name: 'release date'},
    {value: 'rating', name: 'rating'},
  ];

  public state = {
    items: movies,
    sortingOptions: this.sortingOptions,
    sorting: this.sortingOptions[0],
  };

  private handleSortingChange(sorting: RadioGroupOption) {
    this.setState({sorting});
  }

  private renderResults() {
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
        <MoviesListComponent items={this.state.items}/>
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

  private getContent() {
    return this.state.items.length
      ? this.renderResults()
      : this.renderEmptyState();
  }

  public render() {
    return (
      <LayoutComponent
        header={<HeaderComponent/>}
        content={this.getContent()}
      />
    );
  }
}
