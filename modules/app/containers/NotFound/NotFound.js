import React, { Component, PropTypes } from 'react'
import styles from './NotFound.css'

export default class NotFound extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className={styles.notFound}>404</div>
    )
  }
}
