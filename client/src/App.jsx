import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { customTheme } from './theme';
import { HomePage } from './pages/HomePage';
import { ResourcePage } from './pages/ResourcePage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { FilterPage } from './pages/FilterPage';
import { ProfilePage } from './pages/ProfilePage';
import { UploadPage } from './pages/UploadPage';
import { AboutPage } from './pages/AboutPage';

const App = () => (
  <ChakraProvider theme={customTheme}>
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/resource/:resourceId" component={ResourcePage} />
        <Route path="/register" exact component={RegistrationPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/search" component={FilterPage} />
        <Route path="/upload" component={UploadPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/" component={() => <h1>404</h1>} />
      </Switch>
    </Router>
  </ChakraProvider>
);

export default App;
