import { chakra, useColorModeValue } from '@chakra-ui/react';
import { FOOTER_LOGO } from '../../constants/svgPaths';

export const Logo = () => {
  return (
    <chakra.svg
      aria-hidden
      viewBox="0 0 181.201 64.721"
      fill="none"
      h="64.721"
      flexShrink={0}
    >
      <path d={FOOTER_LOGO} fill={useColorModeValue('gray.800', 'white')} />
    </chakra.svg>
  );
};
