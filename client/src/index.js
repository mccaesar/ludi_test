import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ColorModeScript } from '@chakra-ui/react';

import App from './App';
import store from './store.js';
import { customTheme } from './theme';
import * as serviceWorker from './serviceWorker';
import { GoogleOAuthProvider} from '@react-oauth/google';


window.React = React;
const clientId = process.env.GOOGLE_CLIENT_ID

ReactDOM.render(
  <Provider store={store}>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  // document.getElementById('root')
  document.body.appendChild(document.createElement('div'))
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorker.register();
