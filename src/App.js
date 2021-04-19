import React,{ Component } from 'react';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e84a27'
    }
  }
});
