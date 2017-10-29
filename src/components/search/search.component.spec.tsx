import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SearchComponent } from './search.component';
import { History } from 'history';
import { SortingKinds } from '../../reducers/search.reducer';
import { match } from 'react-router';
import { SearchUrlParams } from '../../routing/search';

describe('SearchComponent', () => {
  let wrapper: ShallowWrapper<SearchComponent>;
  const history: Partial<History> = {
    push: jest.fn(),
  };

  const routerMatch: Partial<match<SearchUrlParams>> = {
    params: {
      query: '',
    },
  };

  const movies = [
    {
      id: 1,
      name: 'Kill Bill',
      releaseYear: 2003,
      kind: 'slasher',
      rating: 8,
      posterUrl: 'https://st.kp.yandex.net/images/film_iphone/iphone360_2717.jpg',
      director: 'Quentin Tarantino',
      description: 'long text',
      duration: 154,
      cast: 'John Travolta, Uma Thurman',
    },
    {
      id: 2,
      name: 'Kill Bill 2',
      releaseYear: 2004,
      kind: 'slasher',
      rating: 5,
      posterUrl: 'https://st.kp.yandex.net/images/film_iphone/iphone360_47015.jpg',
      director: 'Quentin Tarantino',
      description: 'long text',
      duration: 154,
      cast: 'John Travolta, Uma Thurman',
    },
  ];

  beforeEach(() => {
    wrapper = shallow(
      <SearchComponent
        history={history as History}
        match={routerMatch as match<SearchUrlParams>}
        movies={movies}
        onSortingChange={(_sorting: SortingKinds) => {
          // todo:
        }}
        sorting='rating'
        searchBy='name'
        location={{} as any}
      />,
    );
  });

  it('should show results if exists', () => {
    // todo:
  });

  it('should show empty state if no results', () => {
    // todo:
  });

  it('should show how many results found', () => {
    // todo:
  });

  it('should change history on movie select', () => {
    // todo:
  });

  it('should change history on search submit', () => {
    // todo:
  });

  it('should call callback when sorting changed', () => {
    // todo:
  });
});
