import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import { ColorModeScript } from "@chakra-ui/react"

import store from './store.js';
import App from './App';
import { customTheme } from './theme';

ReactDOM.render(
  <Provider store={store}>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
