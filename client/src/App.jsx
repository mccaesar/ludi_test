import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { customTheme } from './theme';
import { HomePage } from './pages/HomePage';

const App = () => (
  <ChakraProvider theme={customTheme}>
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        {/* <Route path="/login" exact componenet={} */}
        <Route path="/" component={() => <h1>404</h1>} />
      </Switch>
    </Router>
  </ChakraProvider>
);

export default App;
