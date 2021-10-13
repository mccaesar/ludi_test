import { extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#ecefff',
      100: '#cbceeb',
      200: '#a9aed6',
      300: '#888ec5',
      400: '#666db3',
      500: '#4d5499',
      600: '#3c4178',
      700: '#2a2f57',
      800: '#181c37',
      900: '#080819',
    },
    ludi: {
      100: '#fea346',
      200: '#fd8201',
      300: '#ca6401',
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
//   fonts: {
//     heading: 'Lato',
//     body: 'Lato',
//   },
});
