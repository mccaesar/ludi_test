import {
  Box,
  Container,
  Link,
  Stack,
  Switch,
  useColorModeValue,
  useColorMode
} from '@chakra-ui/react';

import { Logo } from './Logo';



export const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box
      w="full"
      position="fixed"
      bottom="0"
      bg={useColorModeValue('gray.100', 'gray.900')}
     color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}>
        <Logo />
        <Stack direction={'row'} spacing={6}>
          <Link href={'#'}>Home</Link>
          <Link href={'#'}>About</Link>
          <Link href={'#'}>Contact</Link>
          <Switch onChange={toggleColorMode} colorScheme="gray" size="lg" defaultChecked />
        </Stack>
      </Container>
    </Box>
  );
};
