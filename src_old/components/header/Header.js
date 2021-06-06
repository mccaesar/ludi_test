import Button from '@material-ui/core/Button';
import Dropdown from './Dropdown';
import logo from 'assets/logo.jpg';
import React, { Component } from 'react';
import './Header.css';
import { Redirect } from 'react-router-dom';
import firebase from '@firebase/app';

// var firebase = require('firebase');

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      redirect: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.forceUpdate();
    });
  }

  render() {
    if (this.state.redirect === true) {
      return (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      );
    }
    let loginInfo;
    if (firebase.auth().currentUser != null) {
      loginInfo = (
        <div class="child-wrapper">
          <Dropdown />
          <Button
            id="button"
            variant="outlined"
            color="primary"
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  // Sign-out successful.
                  this.setState({
                    ...this.state,
                    user: null,
                  });
                })
                .catch((error) => {
                  // An error happened.
                  console.log(error);
                });
            }}
          >
            logout
          </Button>
        </div>
      );
    } else {
      loginInfo = (
        <Button
          id="login-button"
          variant="outlined"
          color="primary"
          onClick={() => this.setState({ redirect: true })}
        >
          login
        </Button>
      );
    }
    return (
      <div className="header-wrapper">
        <header className="header-content">
          <a href="/">
            <img src={logo} alt="logo" style={{ width: 30, height: 30 }}></img>
          </a>
          <div id="header-spacer"></div>
          {loginInfo}
        </header>
      </div>
    );
  }
}
