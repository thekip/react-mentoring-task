import React, { Component } from 'react';
import styles from './movies-list.scss';
import { MoviesItemComponent } from './movie-item/movie-item.component';
import { MovieItemModel } from './movie-item/movie-item.model';
import { MoviesListHeaderComponent } from './movie-list-header/movies-list-header.component';

interface IMoviesListComponentState {
  items: MovieItemModel[];
}

export class MoviesListComponent extends Component<any, IMoviesListComponentState> {
  public state: IMoviesListComponentState = {
    items: [],
  };

  public render() {
    return (
      <div className={styles.host}>
        <MoviesListHeaderComponent/>
        {this.state.items.map((item) => (
          <MoviesItemComponent key={item.id}/>
        ))}
      </div>
    );
  }
}
