import { chakra, useColorModeValue } from '@chakra-ui/react';
import { NAVBAR_LOGO } from '../../constants/svgPaths';

export const Logo = () => {
  return (
    <chakra.svg
      aria-hidden
      viewBox="0 0 135.9 48.541"
      fill="none"
      h="50"
      flexShrink={0}
    >
      <path d={NAVBAR_LOGO} fill={useColorModeValue('#ca6401', 'white')} />
    </chakra.svg>
  );
};
