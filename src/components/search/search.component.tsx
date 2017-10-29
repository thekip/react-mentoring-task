import React, { PureComponent } from 'react';
import styles from './search.scss';
import { HeaderComponent } from '../header/header.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { RadioGroupComponent, RadioGroupOption } from '../common/radio-group/radio-group.component';
import { LayoutComponent } from '../layout/layout.component';
import autobind from 'autobind-decorator';
import { MovieItemModel } from '../../../shared/movie-item.model';
import { RouteComponentProps } from 'react-router';
import { SearchUrlParams } from '../../routing/search';
import { SearchBarContainer } from './search-bar/search-bar.component';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { MovieCollection } from '../../reducers/movies.reducer';
import { Dispatch } from 'redux';
import { searchSortingChanged } from '../../actions/search.actions';
import { SortingKinds } from '../../reducers/search.reducer';

type OwnProps = RouteComponentProps<SearchUrlParams>;

interface StoreProps {
  sorting: string;
  searchBy: string;
  movies: MovieCollection;
}

interface DispatchProps {
  onSortingChange: (sortingKey: SortingKinds) => void;
}

type Props = StoreProps & OwnProps & DispatchProps;
const sortingOptions: Array<RadioGroupOption<SortingKinds>> = [
  {value: 'releaseYear', name: 'release date'},
  {value: 'rating', name: 'rating'},
];
export class SearchComponent extends PureComponent<Props> {
  private getMovies(): MovieCollection {
    return this.props.movies;
  }

  @autobind
  private handleSortingChange(sorting: RadioGroupOption<SortingKinds>) {
    this.props.onSortingChange(sorting.value);
  }

  @autobind
  private handleMovieClick(item: MovieItemModel) {
    this.props.history.push('/film/' + item.name);
  }

  @autobind
  private handleSearch(query: string) {
    this.props.history.push('/search/' + query);
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
              options={sortingOptions}
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
        <SearchBarContainer
          query={this.props.match.params.query}
          onSearch={this.handleSearch}/>
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

function sortMovies(movies: MovieCollection, sortingKey: keyof MovieItemModel) {
  return [...movies]
    .sort((a, b) => (a[sortingKey] as number) - (b[sortingKey] as number));
}

function mapStateToProps(state: AppState): StoreProps {

  return {
    sorting: state.search.sorting,
    searchBy: state.search.searchBy,
    movies: sortMovies(state.movies, state.search.sorting),
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): DispatchProps {
  return {
   onSortingChange: (sortingKey) => dispatch(searchSortingChanged(sortingKey)),
  };
}

export const SearchContainer = connect<StoreProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchComponent);
