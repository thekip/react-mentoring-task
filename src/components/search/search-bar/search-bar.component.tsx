import React, { ChangeEvent, Component, FormEvent } from 'react';
import styles from './search-bar.scss';
import { RadioGroupComponent, RadioGroupOption } from '../../common/radio-group/radio-group.component';
import autobind from 'autobind-decorator';

interface SearchBarComponentProps {
  query: string;
  searchBy: string;
  onChangeSearchBy: (property: string) => void;
  onSearch: (query: string) => void;
}

export class SearchBarComponent extends Component<SearchBarComponentProps> {
  private searchByOptions: RadioGroupOption[] = [
    { value: 'name', name: 'Title' },
    { value: 'director', name: 'Director' },
  ];

  public state = {
    query: this.props.query || '',
  };

  @autobind
  private handleSelectSearchBy(searchBy: RadioGroupOption) {
    this.props.onChangeSearchBy(searchBy.value);
  }

  @autobind
  private handleSubmit(event: FormEvent<any>) {
    event.preventDefault();
    this.props.onSearch(this.state.query);
  }

  @autobind
  private handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({query: event.target.value});
  }

  public render() {
    const searchBy = this.searchByOptions.find((o) => o.value === this.props.searchBy);

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
              selected={searchBy}
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
