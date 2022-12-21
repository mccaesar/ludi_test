import { chakra, useColorModeValue } from '@chakra-ui/react';
import { NAVBAR_LOGO, NEW_LOGO } from '../../constants/svgPaths';

export const Logo = () => {
  return (
    <chakra.svg
      aria-hidden
      viewBox="0 0 397.97 405"
      fill="none"
      h="30"
      flexShrink={0}
    >
      <path d={NEW_LOGO} fill={useColorModeValue('#0474dc', 'white')} />
    </chakra.svg>
  );
};
