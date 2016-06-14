import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// import { connect } from 'react-redux';
// import { login } from 'app/actions/auth';
import styles from './Home.css';

// @connect(null, { login })
export default class Home extends Component {
  static propTypes = {

  };

  // static fetchData = ({ store }) => {
  //   return store.dispatch(login());
  // }

  render() {
    return (
      <div className={styles.home}>
        Welcome to React Universal Starter Kit
      </div>
    );
  }
}
