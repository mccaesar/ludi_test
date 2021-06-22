import React from 'react';

import {
  chakra,
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  IconButton,
  CloseButton,
  VisuallyHidden,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { NAVBAR_LOGO } from '../../constants/svgPaths';

const Logo = () => {
  return (
    <chakra.svg
      aria-hidden
      viewBox="0 0 135.9 48.541"
      fill="none"
      h="48.541"
      flexShrink={0}
    >
      <path d={NAVBAR_LOGO} fill={useColorModeValue('gray.800', 'white')} />
    </chakra.svg>
  );
};

export const NavBar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();

  return (
    <chakra.header bg={bg} w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
      <Flex
        maxW={{ base: 'xl', md: '7xl' }}
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
      >
        <Flex>
          <chakra.a
            href="/"
            title="Choc Home Page"
            display="flex"
            alignItems="center"
          >
            <Logo />
            <VisuallyHidden>Ludi</VisuallyHidden>
          </chakra.a>
        </Flex>
        <HStack display="flex" alignItems="center" spacing={1}>
          <HStack
            spacing={2}
            mr={1}
            color="brand.500"
            display={{ base: 'none', md: 'inline-flex' }}
          >
            <Button variant="ghost">Sign in</Button>
            <Button colorScheme="brand">Get Started</Button>
          </HStack>
          <Box display={{ base: 'inline-flex', md: 'none' }}>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="Open menu"
              fontSize="20px"
              color={useColorModeValue('gray.800', 'inherit')}
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />

            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? 'flex' : 'none'}
              flexDirection="column"
              p={2}
              pb={4}
              m={2}
              bg={bg}
              spacing={3}
              rounded="sm"
              shadow="sm"
            >
              <CloseButton
                aria-label="Close menu"
                onClick={mobileNav.onClose}
              />
              <Button w="full" variant="ghost">
                Sign in
              </Button>
              <Button w="full" colorScheme="brand">
                Get Started
              </Button>
            </VStack>
          </Box>
        </HStack>
      </Flex>
    </chakra.header>
  );
};
