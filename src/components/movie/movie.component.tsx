import React, { PureComponent } from 'react';
import { LayoutComponent } from '../layout/layout.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import styles from './movie.scss';
import { RouteComponentProps } from 'react-router';
import { MovieUrlParams } from '../../routing/movie';
import { MovieCollection, MovieItemModel } from '../../../shared/movie-item.model';
import autobind from 'autobind-decorator';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { loadMovie, loadRelatedMovies } from '../../actions/details.actions';

type OwnProps = RouteComponentProps<MovieUrlParams>;

interface StoreProps {
  movie: MovieItemModel;
  relatedMovies: MovieCollection;
}

interface DispatchProps {
  onLoadData: (name: string) => void;
}

type Props = StoreProps & OwnProps & DispatchProps;

export class MoviePageComponent extends PureComponent<Props> {
  public componentDidMount() {
    this.props.onLoadData(this.props.match.params.name);
  }

  public componentWillReceiveProps(newProps: Props) {
    if (this.props.match.params.name !== newProps.match.params.name) {
      this.props.onLoadData(newProps.match.params.name);
    }
  }

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
    if (!this.props.movie) {
      return <div>Loading...</div>;
    }

    return (
      <LayoutComponent
        header={<MovieDetailsComponent movie={this.props.movie} onBack={this.handleOnBackClick}/>}
        content={this.getContent()}
      />
    );
  }
}

function mapStateToProps(state: AppState): StoreProps {
  return {
    movie: state.details.movie,
    relatedMovies: state.details.related,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): DispatchProps {
  return {
    onLoadData: async (name) => {
      const movie = await dispatch(loadMovie(name));
      dispatch(loadRelatedMovies(movie.director));
    },
  };
}

export const MoviePageContainer = connect<StoreProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(MoviePageComponent);
