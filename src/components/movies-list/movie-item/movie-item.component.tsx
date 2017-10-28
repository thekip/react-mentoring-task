import React, { PureComponent } from 'react';
import { MovieItemModel } from '../../../movie-item.model';
import styles from './movie-item.scss';

interface MoviesItemComponentProps {
  item: MovieItemModel;
  onClick: () => void;
}

export class MoviesItemComponent extends PureComponent<MoviesItemComponentProps> {
  public render() {
    return (
      <div className={styles.host} onClick={this.props.onClick}>
        <img className={styles.poster} src={this.props.item.posterUrl}/>
        <div className={styles.meta}>
          <span className={styles.movieName}>{this.props.item.name}</span>
          <span className={styles.year}>{this.props.item.releaseYear}</span>
        </div>
        <div className={styles.meta}>
          <span className={styles.kind}>{this.props.item.kind}</span>
        </div>
      </div>
    );
  }
}
