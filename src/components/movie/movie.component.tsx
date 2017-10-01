import React, { Component } from 'react';
import { LayoutComponent } from '../layout/layout.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { HeaderComponent } from './header/header.component';
import styles from './movie.scss';
import { movies as db } from '../../movies-db';
import { RouteComponentProps } from 'react-router';
import { MovieUrlParams } from '../routing/movie';
import { MovieItemModel } from '../movies-list/movie-item/movie-item.model';
import autobind from 'autobind-decorator';

type MoviePageComponentProps = RouteComponentProps<MovieUrlParams>;

export class MoviePageComponent extends Component<MoviePageComponentProps> {
  @autobind
  private handleMovieClick(item: MovieItemModel) {
    this.props.history.push('/film/' + item.name);
  }

  @autobind
  private handleOnBackClick() {
    this.props.history.push('/');
  }

  private getMovie() {
    return db.find((item) => item.name.toLowerCase() === this.props.match.params.name.toLowerCase());
  }

  private getRelatedMovies(director: string) {
    return db.filter((item) => item.director.toLowerCase() === director.toLowerCase());
  }

  private getContent(movie: MovieItemModel) {
    const movies = this.getRelatedMovies(movie.director);

    return (
      <div className={styles.host}>
        <div className={styles.header}>
          <span>Films by {movie.director}</span>
        </div>
        <MoviesListComponent items={movies} onClick={this.handleMovieClick}/>
      </div>
    );
  }

  public render() {
    const movie = this.getMovie();

    return (
      <LayoutComponent
        header={<HeaderComponent movie={movie} onBack={this.handleOnBackClick}/>}
        content={this.getContent(movie)}
      />
    );
  }
}
