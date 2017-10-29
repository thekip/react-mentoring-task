import React, { PureComponent } from 'react';
import styles from './movies-list.scss';
import { MoviesItemComponent } from './movie-item/movie-item.component';
import { MovieItemModel } from '../../../shared/movie-item.model';
import { MovieCollection } from '../../reducers/movies.reducer';

interface MoviesListComponentProps {
  items: MovieCollection;
  onClick: (item: MovieItemModel) => void;
}

export class MoviesListComponent extends PureComponent<MoviesListComponentProps> {
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
