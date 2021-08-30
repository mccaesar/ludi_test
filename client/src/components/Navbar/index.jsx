import {
  chakra,
  Box,
  Flex,
  HStack,
  Button,
  VisuallyHidden,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
// import { BsSun, BsMoon } from 'react-icons/bs';

import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
// import { SearchModal } from '../SearchModal';
import { UserMenu } from './UserMenu';

import { useUser } from '../../hooks/useUser';

export const Navbar = () => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const mobileNav = useDisclosure();
  const searchModal = useDisclosure();

  const { user } = useUser();

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
              bg={useColorModeValue('gray.200', 'gray.700')}
              color={useColorModeValue('gray.400', 'gray.500')}
              w="2xs"
              mx={{ base: '2', md: '4' }}
              justifyContent="flex-start"
              // onClick={searchModal.onOpen}
              as="a"
              href="/search"
            >
              Search Resources
            </Button>

            {user ? (
              <Box>
                <UserMenu fullname={user.firstName + ' ' + user.lastName} />
              </Box>
            ) : (
              <HStack
                spacing={2}
                mr={1}
                color="brand.500"
                display={{ base: 'none', md: 'inline-flex' }}
              >
                <Button variant="ghost" size="sm" as="a" href="/login">
                  Sign In
                </Button>
                <Button colorScheme="brand" size="sm" as="a" href="/register">
                  Sign Up
                </Button>
              </HStack>
            )}
          </HStack>

          <MobileNav
            disclosures={{
              mobileNav,
              searchModal,
            }}
            bg={bg}
          />
        </Flex>
      </chakra.header>
      {/* <SearchModal disclosure={searchModal} /> */}
    </>
  );
};
