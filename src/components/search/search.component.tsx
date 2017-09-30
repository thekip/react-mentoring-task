import React, { Component } from 'react';
import styles from './search.scss';
import { HeaderComponent } from '../header/header.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { movies } from '../movies-list/movies-db';
import { RadioGroupComponent, RadioGroupOption } from '../common/radio-group/radio-group.component';
import { LayoutComponent } from '../layout/layout.component';
import autobind from 'autobind-decorator';
import { MovieItemModel } from '../movies-list/movie-item/movie-item.model';
import { RouteComponentProps } from 'react-router';
import { SearchUrlParams } from '../routing/search';

type SearchComponentProps = RouteComponentProps<SearchUrlParams>;

export class SearchComponent extends Component<SearchComponentProps> {
  private sortingOptions: RadioGroupOption[] = [
    {value: 'releaseDate', name: 'release date'},
    {value: 'rating', name: 'rating'},
  ];

  public state = {
    items: movies,
    sortingOptions: this.sortingOptions,
    sorting: this.sortingOptions[0],
  };

  public componentWillMount() {
    this.setMovies(this.props.match.params.query);
  }

  public componentWillReceiveProps(props: SearchComponentProps) {
    this.setMovies(props.match.params.query);
  }

  private setMovies(query: string) {
    if (!query) {
      this.setState({ items: [] });
      return;
    }

    this.setState({ items: this.filterMovies(query, movies) }) ;
  }

  private filterMovies(query: string, db: MovieItemModel[]) {
    return db.filter((movie) => movie.name.toLowerCase().includes(query.toLowerCase()));
  }

  @autobind
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
              onSelect={this.handleSortingChange}
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
