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
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { BsSun, BsMoon } from 'react-icons/bs';

import { Logo } from './Logo';
import { LoginModal } from '../LoginModal';
import { RegistrationModal } from '../RegistrationModal';
import { SearchModal } from '../SearchModal';

export const NavBar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  const searchModal = useDisclosure();
  const loginModal = useDisclosure();
  const registrationModal = useDisclosure();

  return (
    <>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex
          maxW={{ base: 'xl', md: '8xl' }}
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
        >
          <HStack display="flex" spacing={4} alignItems="center">
            <chakra.a
              href="/"
              title="Ludi Home Page"
              display="flex"
              alignItems="center"
            >
              <Logo />
              <VisuallyHidden>Ludi</VisuallyHidden>
            </chakra.a>
          </HStack>

          <HStack display="flex" alignItems="center" spacing={1}>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              leftIcon={<AiOutlineSearch />}
              fontWeight="medium"
              bg="gray.700"
              color="gray.500"
              w="2xs"
              mx={{ base: '2', md: '4' }}
              justifyContent="flex-start"
              onClick={searchModal.onOpen}
            >
              Search Resources
            </Button>

            <HStack
              spacing={2}
              mr={1}
              color="brand.500"
              display={{ base: 'none', md: 'inline-flex' }}
            >
              <Button variant="ghost" size="sm" onClick={loginModal.onOpen}>
                Sign In
              </Button>
              <Button
                colorScheme="brand"
                size="sm"
                onClick={registrationModal.onOpen}
              >
                Join for free
              </Button>
            </HStack>
          </HStack>

          <Box display={{ base: 'inline-flex', md: 'none' }}>
            <IconButton
              icon={<AiOutlineSearch />}
              display={{ base: 'inline-flex', md: 'none' }}
              mx={{ base: '4', md: '6' }}
              colorScheme="brand"
              isRound="true"
              onClick={searchModal.onOpen}
            />
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
                justifySelf="self-start"
                onClick={mobileNav.onClose}
              />
              <Button
                w="full"
                variant="ghost"
                onClick={(e) => {
                  mobileNav.onClose(e);
                  loginModal.onOpen(e);
                }}
              >
                Sign In
              </Button>
              <Button
                w="full"
                colorScheme="brand"
                onClick={(e) => {
                  mobileNav.onClose(e);
                  registrationModal.onOpen(e);
                }}
              >
                Sign Up
              </Button>
            </VStack>
          </Box>
        </Flex>
      </chakra.header>
      <SearchModal isOpen={searchModal.isOpen} onClose={searchModal.onClose} />
      <LoginModal isOpen={loginModal.isOpen} onClose={loginModal.onClose} />
      <RegistrationModal
        isOpen={registrationModal.isOpen}
        onClose={registrationModal.onClose}
      />
    </>
  );
};
