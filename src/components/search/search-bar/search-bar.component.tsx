import React, { ChangeEvent, Component, FormEvent } from 'react';
import styles from './search-bar.scss';
import { RadioGroupComponent, RadioGroupOption } from '../../common/radio-group/radio-group.component';
import autobind from 'autobind-decorator';
import { AppState } from '../../../store';
import { connect, Dispatch } from 'react-redux';
import { performSearch, searchByChanged, searchQueryChanged } from '../../../actions/search.actions';

interface OwnProps {
  query: string;
  onSearch: (query: string) => void;
}

interface StoreProps {
  searchBy: string;
}

interface DispatchProps {
  onChangeSearchBy: (property: string) => void;
  onQueryChange: (query: string) => void;
}

type Props = OwnProps & StoreProps & DispatchProps;

export class SearchBarComponent extends Component<Props> {
  private searchByOptions: RadioGroupOption[] = [
    {value: 'name', name: 'Title'},
    {value: 'director', name: 'Director'},
  ];

  public state = {
    query: this.props.query || '',
  };

  public componentDidMount() {
    if (this.props.query) {
      this.props.onQueryChange(this.props.query);
    }
  }

  @autobind
  private handleSelectSearchBy(searchBy: RadioGroupOption) {
    this.props.onChangeSearchBy(searchBy.value);
  }

  @autobind
  private handleSubmit(event: FormEvent<any>) {
    event.preventDefault();
    this.props.onQueryChange(this.state.query);
  }

  @autobind
  private handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({query: event.target.value});
  }

  public render() {
    return (
      <div className={styles.host}>
        <h2 className={styles.heading}>Find your movie</h2>
        <form onSubmit={this.handleSubmit}>
          <input type='text'
                 value={this.state.query}
                 placeholder='Kill Bill 2'
                 name='search'
                 onChange={this.handleChange}
                 className={styles.input}/>
          <div className={styles.actionsRow}>
            <span>Search by</span>
            <RadioGroupComponent
              selected={this.props.searchBy}
              options={this.searchByOptions}
              onSelect={this.handleSelectSearchBy}
            />
            <button className={styles.submitBtn} type='submit'>Search</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: AppState): StoreProps {
  return {
    searchBy: state.search.searchBy,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: OwnProps): DispatchProps {
  return {
    onChangeSearchBy: (property) => {
      dispatch(searchByChanged(property));
      dispatch(performSearch());
    },
    onQueryChange: (query) => {
      dispatch(searchQueryChanged(query));
      dispatch(performSearch());
      ownProps.onSearch(query);
    },
  };
}

export const SearchBarContainer = connect<StoreProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBarComponent);
