import React, { Component } from 'react';
import styles from './movies-list.scss';
import { MoviesItemComponent } from './movie-item/movie-item.component';
import { MovieItemModel } from './movie-item/movie-item.model';
import { MoviesListHeaderComponent } from './movie-list-header/movies-list-header.component';
import {movies} from './movies-db';

interface IMoviesListComponentState {
  items: MovieItemModel[];
}

export class MoviesListComponent extends Component<any, IMoviesListComponentState> {
  public state: IMoviesListComponentState = {
    items: movies,
  };

  public render() {
    return (
      <div className={styles.host}>
        <MoviesListHeaderComponent/>

        {this.state.items.length && (
          <div className={styles.list}>
            {this.state.items.map((item) => (
              <MoviesItemComponent item={ item } key={ item.id } />
            ))}
          </div>
        )}

        {this.state.items.length === 0 && (
          <div className={styles.emptyState}>
            Nothing found
          </div>
        )}
      </div>
    );
  }
}
