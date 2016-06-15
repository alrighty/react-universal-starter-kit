import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { login, logout, checkAuth } from 'app/actions/auth';
import styles from './Home.css';

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = {
  login,
  logout,
  checkAuth
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
  static propTypes = {

  };

  // static fetchData = ({ store }) => {
  //   return store.dispatch(login());
  // }

  componentDidMount() {
    if (!this.props.user) {
      this.props.checkAuth();
    }
  }

  handleLogout = (event) => {
    event.preventDefault()
    this.props.logout()
  }

  render() {
    return (
      <div className={styles.home}>
        Welcome to React Universal Starter Kit
        {this.props.user &&
          <p>Logged in as: {this.props.user.name}, <a href="/logout" onClick={this.handleLogout}>logout</a></p>
        }
        {!this.props.user &&
          <p>Login with <a href="/api/auth/github">GitHub</a></p>
        }
      </div>
    );
  }
}
