import React, { Component } from 'react';
import styles from './search.scss';
import { HeaderComponent } from '../header/header.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { movies } from '../../movies-db';
import { RadioGroupComponent, RadioGroupOption } from '../common/radio-group/radio-group.component';
import { LayoutComponent } from '../layout/layout.component';
import autobind from 'autobind-decorator';
import { MovieItemModel } from '../../movie-item.model';
import { RouteComponentProps } from 'react-router';
import { SearchUrlParams } from '../routing/search';
import { SearchBarComponent } from './search-bar/search-bar.component';

type SearchComponentProps = RouteComponentProps<SearchUrlParams>;

export class SearchComponent extends Component<SearchComponentProps> {
  private sortingOptions: RadioGroupOption[] = [
    {value: 'releaseYear', name: 'release date'},
    {value: 'rating', name: 'rating'},
  ];

  public state = {
    sortingOptions: this.sortingOptions,
    sorting: this.sortingOptions[0],
    searchBy: 'name',
  };

  private getMovies(): MovieItemModel[] {
    if (!this.props.match.params.query) {
      return [];
    }
    return this.filterMovies(this.props.match.params.query, movies);
  }

  private filterMovies(query: string, db: MovieItemModel[]) {
    const sortingKey = this.state.sorting.value as any;
    const searchKey = this.state.searchBy;
    return db
      .filter((movie: any) => movie[searchKey].toLowerCase().includes(query.toLowerCase()))
      .sort(((a: any, b: any) => a[sortingKey] - b[sortingKey]) as any);
  }

  @autobind
  private handleSortingChange(sorting: RadioGroupOption) {
    this.setState({sorting});
  }

  @autobind
  private handleMovieClick(item: MovieItemModel) {
    this.props.history.push('/film/' + item.name);
  }

  @autobind
  private handleSearch(query: string) {
    this.props.history.push('/search/' + query);
  }

  @autobind
  private handleChangeSearchBy(searchBy: string) {
    this.setState({searchBy});
  }

  private renderResults(items: MovieItemModel[]) {
    return (
      <div className={styles.host}>
        <div className={styles.header}>
          <span className={styles.total}>
            {items.length} movies found
          </span>
          <div className={styles.sorting}>
            <span>Sort by</span>
            <RadioGroupComponent
              options={this.state.sortingOptions}
              selected={this.state.sorting}
              onSelect={this.handleSortingChange}
            />
          </div>
        </div>
        <MoviesListComponent items={items} onClick={this.handleMovieClick}/>
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
    const items = this.getMovies();

    return items.length
      ? this.renderResults(items)
      : this.renderEmptyState();
  }

  private getHeader() {
    return (
      <HeaderComponent>
        <SearchBarComponent
          searchBy={this.state.searchBy}
          onSearch={this.handleSearch}
          onChangeSearchBy={this.handleChangeSearchBy}
          query={this.props.match.params.query}/>
      </HeaderComponent>
    );
  }

  public render() {
    return (
      <LayoutComponent
        header={this.getHeader()}
        content={this.getContent()}
      />
    );
  }
}
