import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import './App.css';
import HomePage from './pages/home/Home.js';
import ResourceListPage from './pages/resource_list/ResourceList.js';
import LoginPage from './pages/login/Login.js';
import ResourcePage from './pages/resource/Resource.js';
import ProfilePage from './pages/profile/Profile.js';
import UploadPage from './pages/upload/Upload.js';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e84a27 !important',
    },
  },
});

const rootElement = document.getElementById('root');

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path="/results" component={ResourceListPage} />
        <Route path="/login" component={LoginPage} />
        <Route path={'/product/:productID'} component={ResourcePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/upload" component={UploadPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
