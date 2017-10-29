import { MovieItemModel } from '../../shared/movie-item.model';

export type SearchByKinds = 'director' | 'name';

export class MoviesApi {
  public static searchMovies(searchBy: SearchByKinds, query: string): Promise<MovieItemModel[]> {
    return fetch(`/api/search/${searchBy}/${query}`)
      .then((res) => res.json());
  }

  public static getMovie(name: string): Promise<MovieItemModel> {
    return fetch(`/api/movie/${name}`)
      .then((res) => res.json());
  }
}
