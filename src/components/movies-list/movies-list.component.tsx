import React, { Component } from 'react';
import styles from './movies-list.scss';
import { MoviesItemComponent } from './movie-item/movie-item.component';
import { MovieItemModel } from './movie-item/movie-item.model';

interface MoviesListComponentProps {
  items: MovieItemModel[];
  onClick: (item: MovieItemModel) => void;
}

export class MoviesListComponent extends Component<MoviesListComponentProps> {
  public render() {
    return (
      <div className={styles.host}>
        {this.props.items.map((item) => (
          <MoviesItemComponent
            onClick={() => this.props.onClick(item)}
            item={ item }
            key={ item.id } />
        ))}
      </div>
    );
  }
}
