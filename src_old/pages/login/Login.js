import React from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { Helmet } from 'react-helmet';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import 'App.css';
import './Login.css';
import logo from 'assets/logo.jpg';
import Login from 'firebase_components/login';
import Paper from '@material-ui/core/Paper';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e84a27',
    },
    secondary: {
      main: '#fd8200',
    },
  },
  divider: {
    background: '#fd8200',
  },
});

var firebase = require('firebase');

export default class loginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('function called');
      if (user) {
        this.setState({
          ...this.state,
          user: user,
        });
        console.log('logged in as', user);
      } else {
        console.log('failed to log in');
      }
    });
  }
  render() {
    if (firebase.auth().currentUser !== null) {
      return <p>You are already logged In</p>;
    }
    return (
      <MuiThemeProvider theme={theme}>
        <Helmet>
          <title>LUDI | login</title>
        </Helmet>
        <Paper id="login-wrapper">
          <div className="App">
            <script src="https://cdn.firebase.com/libs/firebaseui/1.0.0/firebaseui.js"></script>
            <link
              type="text/css"
              rel="stylesheet"
              href="https://cdn.firebase.com/libs/firebaseui/1.0.0/firebaseui.css"
            />
            <header className="login-header">
              <a href="/">
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: 100, height: 100 }}
                ></img>
              </a>
            </header>
            <div className="login-box">
              <Box
                border={1}
                xs={{ fontSize: 12 }}
                sm={{ fontSize: 18 }}
                md={{ fontSize: 24 }}
                p={1}
                borderColor="secondary.main"
                width={1 / 5}
                borderRadius="2%"
              >
                <div id="login-text">
                  <h3>Sign in to LUDI</h3>
                </div>
                <Divider variant="middle" background="divider.background" />
                <div id="login-component">
                  <Login />
                </div>
              </Box>
            </div>
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}
