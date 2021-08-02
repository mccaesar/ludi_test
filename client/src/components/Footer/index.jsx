import {
  Flex,
  Box,
  Container,
  Link,
  Stack,
  Switch,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';

import { Logo } from './Logo';

export const Footer = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Box
      minW="full"
      // position="absolute"
      // bottom="0"
      // shrink="false"
      as="footer"
      flexShrink="false"
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Logo />
        <Stack direction={'row'} spacing={6}>
          <Link href={'/'}>Home</Link>
          <Link href={'/about'}>About</Link>
          <Link href={'/upload'}>Submission</Link>
          <Link href="mailto:ludi@illinois.edu">Contact</Link>
          <Switch
            onChange={toggleColorMode}
            colorScheme="gray"
            size="lg"
            defaultChecked
          />
        </Stack>
      </Container>
    </Box>
  );
};

export const WithFooter = ({ children }) => {
  return (
    <Flex w="full" h="100vh" direction="column">
      <Flex w="full" direction="column" grow="true" shrink="false" basis="auto">
        {children}
      </Flex>
      <Box mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
};
