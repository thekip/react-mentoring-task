import React, { PureComponent } from 'react';
import { LayoutComponent } from '../layout/layout.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import styles from './movie.scss';
import { RouteComponentProps } from 'react-router';
import { MovieUrlParams } from '../../routing/movie';
import { MovieItemModel } from '../../../shared/movie-item.model';
import autobind from 'autobind-decorator';
import { MovieCollection } from '../../reducers/movies.reducer';
import { AppState } from '../../store';
import { connect } from 'react-redux';

type OwnProps = RouteComponentProps<MovieUrlParams>;

interface StoreProps {
  movie: MovieItemModel;
  relatedMovies: MovieCollection;
}

type Props = StoreProps & OwnProps;

export class MoviePageComponent extends PureComponent<Props> {
  @autobind
  private handleMovieClick(item: MovieItemModel) {
    this.props.history.push('/film/' + item.name);
  }

  @autobind
  private handleOnBackClick() {
    this.props.history.push('/');
  }

  private getContent() {
    return (
      <div className={styles.host}>
        <div className={styles.header}>
          <span>Films by {this.props.movie.director}</span>
        </div>
        <MoviesListComponent items={this.props.relatedMovies} onClick={this.handleMovieClick}/>
      </div>
    );
  }

  public render() {
    return (
      <LayoutComponent
        header={<MovieDetailsComponent movie={this.props.movie} onBack={this.handleOnBackClick}/>}
        content={this.getContent()}
      />
    );
  }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StoreProps {
  const movie: MovieItemModel = state.movies.find((item) =>
    item.name.toLowerCase() === ownProps.match.params.name.toLowerCase(),
  );

  return {
    movie,
    relatedMovies: state.movies.filter((item) =>
      item.director.toLowerCase() === movie.director.toLowerCase(),
    ),
  };
}

export const MoviePageContainer = connect<StoreProps, OwnProps>(
  mapStateToProps,
)(MoviePageComponent);
