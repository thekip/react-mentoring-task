import React, { Component } from 'react';
import { MovieItemModel } from './movie-item.model';
import styles from './movie-item.scss';

interface MoviesItemComponentProps {
  item: MovieItemModel;
}

export class MoviesItemComponent extends Component<MoviesItemComponentProps> {
  public render() {
    return (
      <div className={styles.host}>
        <img className={styles.poster} src={this.props.item.posterUrl}/>
        <div className={styles.meta}>
          <span className={styles.movieName}>{this.props.item.name}</span>
        </div>
      </div>
    );
  }
}
