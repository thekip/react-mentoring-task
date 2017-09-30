import React, { Component, ReactNode } from 'react';
import styles from './layout.scss';
import { FooterComponent } from '../footer/footer.component';

interface LayoutComponentProps {
  header: ReactNode;
  content: ReactNode;
}

export class LayoutComponent extends Component<LayoutComponentProps> {
  public render() {
    return (
      <div className={styles.wrap}>
        {this.props.header}
        <div className={styles.content}>
          {this.props.content}
        </div>
        <FooterComponent/>
      </div>
    );
  }
}
