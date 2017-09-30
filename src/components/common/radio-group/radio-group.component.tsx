import React, { Component } from 'react';
import styles from './radio-group.scss';

export interface RadioGroupOption {
  value: string;
  name: string;
}

export interface RadioGroupProps {
  options: RadioGroupOption[];
  type?: string;
  selected: RadioGroupOption;
  onSelect: (option: RadioGroupOption) => void;
}

export class RadioGroupComponent extends Component<RadioGroupProps> {
  private isSelected(option: RadioGroupOption) {
    return this.props.selected.value === option.value;
  }

  public render() {
    return (
      <div className={styles.host}>
        {this.props.options.map((item) => (
          <button key={item.value} type='button'
            onClick={() => this.props.onSelect(item)}
            className={this.isSelected(item) ? styles.itemActive : styles.item }>
            {item.name}
            </button>
        ))}
      </div>
    );
  }
}
