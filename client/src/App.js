import { ChakraProvider } from '@chakra-ui/react';

import customTheme from './theme';
import { HomePage } from './pages/HomePage';

const App = () => (
  <ChakraProvider theme={customTheme}>
    <HomePage />
  </ChakraProvider>
);

export default App;
