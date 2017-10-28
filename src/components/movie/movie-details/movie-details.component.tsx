import React, { PureComponent } from 'react';
import styles from './movie-details.scss';
import { MovieItemModel } from '../../../movie-item.model';
import { HeaderComponent } from '../../header/header.component';

interface HeaderComponentProps {
  movie: MovieItemModel;
  onBack: () => void;
}

export class MovieDetailsComponent extends PureComponent<HeaderComponentProps> {
  public render() {
    const movie = this.props.movie;

    return (
      <HeaderComponent>
        <div className={styles.filmDetails}>
          <button
            className={styles.backToSearch}
            onClick={this.props.onBack}>
            Search
          </button>
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
      </HeaderComponent>
    );
  }
}
