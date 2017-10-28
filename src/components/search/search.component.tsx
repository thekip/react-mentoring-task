import React, { PureComponent } from 'react';
import styles from './search.scss';
import { HeaderComponent } from '../header/header.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { RadioGroupComponent, RadioGroupOption } from '../common/radio-group/radio-group.component';
import { LayoutComponent } from '../layout/layout.component';
import autobind from 'autobind-decorator';
import { MovieItemModel } from '../../movie-item.model';
import { RouteComponentProps } from 'react-router';
import { SearchUrlParams } from '../routing/search';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { MovieCollection } from '../reducers/movies.reducer';

type OwnProps = RouteComponentProps<SearchUrlParams>;

interface StoreProps {
  sortingOptions: RadioGroupOption[];
  sorting: RadioGroupOption;
  searchBy: string;
  movies: MovieCollection;
}

type Props = StoreProps & OwnProps;

export class SearchComponent extends PureComponent<Props> {
  private getMovies(): MovieCollection {
    return this.props.movies;
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

  private renderResults(items: MovieCollection) {
    return (
      <div className={styles.host}>
        <div className={styles.header}>
          <span className={styles.total}>
            {items.length} movies found
          </span>
          <div className={styles.sorting}>
            <span>Sort by</span>
            <RadioGroupComponent
              options={this.props.sortingOptions}
              selected={this.props.sorting}
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
          searchBy={this.props.searchBy}
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

function mapStateToProps(state: AppState): StoreProps {
  return {
    sortingOptions: state.search.sortingOptions,
    sorting: state.search.sorting,
    searchBy: state.search.searchBy,
    movies: state.movies,
  };
}

export const SearchContainer = connect<StoreProps>(
  mapStateToProps,
)(SearchComponent);
