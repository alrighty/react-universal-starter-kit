import React, { Component, PropTypes } from 'react'
import styles from './App.css'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <div className={styles.app}>
        {this.props.children}
      </div>
    )
  }
}
