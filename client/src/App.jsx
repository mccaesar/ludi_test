import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
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

const queryClient = new QueryClient();

const App = () => (
  <ChakraProvider theme={customTheme}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/resource/:index" component={ResourcePage} />
          <Route path="/user/profile" component={ProfilePage} />
          <Route path="/search" exact component={FilterPage} />
          <Route path="/register" exact component={RegistrationPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/upload" exact component={UploadPage} />
          <Route path="/about" exact component={AboutPage} />
          <Route path="/" exact component={HomePage} />
          <Route path="/" component={() => <h1>404</h1>} />
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </ChakraProvider>
);

export default App;
