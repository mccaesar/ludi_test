import { chakra, useColorModeValue } from '@chakra-ui/react';
import { NAVBAR_LOGO, NEW_LOGO, WORD_LOGO } from '../../constants/svgPaths';

export const Logo1 = () => {
  return (
    <chakra.svg
      aria-hidden
      viewBox="0 0 397.97 400"
      fill="none"
      h="50"
      flexShrink={0}
    >
      <path d={NEW_LOGO} fill={useColorModeValue('#0474dc', 'white')} />
    </chakra.svg>
  );
};

export const Logo2 = () => {
  return (
    <chakra.svg
      aria-hidden
      viewBox="0 0 400 30"
      fill="none"
      h="30"
      flexShrink={0}
    >
      <path d={WORD_LOGO} fill={useColorModeValue('#72737d', 'white')} />
    </chakra.svg>
  );
};
