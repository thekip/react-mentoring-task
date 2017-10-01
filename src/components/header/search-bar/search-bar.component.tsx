import React, { ChangeEvent, Component, FormEvent } from 'react';
import styles from './search-bar.scss';
import { RadioGroupComponent, RadioGroupOption } from '../../common/radio-group/radio-group.component';
import { History } from 'history';
import autobind from 'autobind-decorator';
import { match } from 'react-router';
import { SearchUrlParams } from '../../routing/search';

interface SearchBarComponentProps {
  history?: History;
  match?: match<SearchUrlParams>;
}

export class SearchBarComponent extends Component<SearchBarComponentProps> {
  private searchByOptions: RadioGroupOption[] = [
    { value: 'title', name: 'Title' },
    { value: 'director', name: 'Director' },
  ];

  public state = {
    searchByOptions: this.searchByOptions,
    searchBy: this.searchByOptions[0],
    query: this.props.match.params.query || '',
  };

  @autobind
  private handleSelectSearchBy(searchBy: RadioGroupOption) {
    this.setState({searchBy});
  }

  @autobind
  private handleSubmit(event: FormEvent<any>) {
    event.preventDefault();
    this.props.history.push('/search/' + this.state.query);
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
              selected={this.state.searchBy}
              options={this.state.searchByOptions}
              onSelect={this.handleSelectSearchBy}
            />
            <button className={styles.submitBtn} type='submit'>Search</button>
          </div>
        </form>
      </div>
    );
  }
}
