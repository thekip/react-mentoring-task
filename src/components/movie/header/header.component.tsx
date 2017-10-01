import React, { Component } from 'react';
import styles from './header.scss';
import { MovieItemModel } from '../../movies-list/movie-item/movie-item.model';

interface HeaderComponentProps {
  movie: MovieItemModel;
  onBack: () => void;
}

export class HeaderComponent extends Component<HeaderComponentProps> {

  public render() {
    const movie = this.props.movie;

    return (
      <header className={styles.host}>
        <button
          className={styles.backToSearch}
          onClick={this.props.onBack}>
          Search
        </button>
        <div className={styles.filmDetails}>
          <div className={styles.poster}>
            <img src={movie.posterUrl}/>
          </div>
          <div className={styles.meta}>
            <h1 className={styles.movieTitle}>{movie.name}</h1>
            <span className={styles.kind}>{movie.kind}</span>
            <div className={styles.row}>
              <span>{movie.releaseYear}</span> <span>{movie.duration} min</span>
            </div>

            <div className={styles.description}>
              {movie.description}
            </div>

            <div className={styles.director}>
              {movie.director}
            </div>

            <div className={styles.cast}>
              {movie.cast}
            </div>
          </div>
        </div>

      </header>
    );
  }
}
