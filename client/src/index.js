import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ColorModeScript } from '@chakra-ui/react';

import App from './App';
import store from './store.js';
import { customTheme } from './theme';
import * as serviceWorker from './serviceWorker';

window.React = React;

ReactDOM.render(
  <Provider store={store}>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
    <App />
  </Provider>,
  // document.getElementById('root')
  document.body.appendChild(document.createElement('div'))
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorker.register();
