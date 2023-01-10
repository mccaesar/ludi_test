import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

// import '@fontsource/lato/400.css';
// import '@fontsource/lato/700.css';

import { customTheme } from './theme';
import { HomePage } from './pages/HomePage';
import { ResourcePage } from './pages/ResourcePage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { FilterPage } from './pages/FilterPage';
import { ProfilePage } from './pages/ProfilePage';
import { UploadPage } from './pages/UploadPage';
import { AboutPage } from './pages/AboutPage';
import { ActiveUserPage } from './pages/ActiveUserPage';
import { ViewProfilePage } from './pages/ViewProfilePage';
import { PasswordRequestPage } from './pages/PasswordRequestPage';
import { PasswordResetPage } from './pages/PasswordResetPage';
import { CategoryPage } from './pages/CategoryPage';
import { AdminPage } from './pages/AdminPage';
import { EditPage } from './pages/EditPage';
import { CategoryResultPage } from './pages/CategoryResultPage';
// import { CachedWebsitePage } from './pages/CachedWebsitePage';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default 20 seconds before refetching
      staleTime: 1000 * 20,
    },
  },
});

const App = () => (
  <>
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/resource/:index" component={ResourcePage} />
            <Route path="/user/profile" component={ProfilePage} />
            <Route path="/user/:id" component={ViewProfilePage} />
            <Route path="/search" exact component={FilterPage} />
            <Route path="/register" exact component={RegistrationPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/upload" exact component={UploadPage} />
            <Route path="/about" exact component={AboutPage} />
            <Route path="/password/reset" exact component={PasswordRequestPage} />
            <Route path="/password/reset/:index" component={PasswordResetPage} />
            <Route path="/peer-favorites" exact component={ActiveUserPage} />
            <Route path="/category/:category" component={CategoryResultPage} />
            <Route path="/category" component={CategoryPage} />
            <Route path="/admin" component={AdminPage}/>
            <Route path="/edit/:index" component={EditPage}/>
            {/* <Route path ="/cached/:index" component={CachedWebsitePage}/> */}
            <Route path="/" exact component={HomePage} />
            <Route path="/" component={() => <h1>404</h1>} />
          </Switch>
        </Router>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ChakraProvider>
  </>
);

export default App;
