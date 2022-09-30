import {
  chakra,
  Box,
  Flex,
  HStack,
  Button,
  IconButton,
  VisuallyHidden,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Link,
  Stack
} from '@chakra-ui/react';


import { AiOutlineSearch } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { FaSun, FaMoon } from 'react-icons/fa';

import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { UserMenu } from './UserMenu';

import { useUser } from '../../hooks/useUser';
import { useQuery } from 'react-query';
import { userApi } from '../../services';

import axios from 'axios';
import { API_URI } from '../../config';


export const Navbar = () => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const mobileNav = useDisclosure();
  const searchModal = useDisclosure();
  const { toggleColorMode } = useColorMode();
    
  const { user } = useUser();

  const logActivity = (url) => {
    const metadata = {
      author: user ? user._id : null,
      url: url,
      ip: '',
    };
    axios.put(`${API_URI}/logging/loggingUrl`, metadata)
    .catch(function(error) {
      if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
      }
    });
  }

  return (
    <>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={3}
        shadow="md"
      >
        <Flex
          //   maxW={{ base: 'xl', md: '8xl' }}
          alignItems="center"
          justifyContent="space-between"
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

          <HStack
            display="flex"
            alignItems="center"
            spacing={2}
          >

              <Stack direction={'row'} spacing={6} mr={4}>
                  <Link href={'/'} onClick={() => logActivity('/')}>Home</Link>
                  <Link href={'/about'} onClick={() => logActivity('/about')}>About</Link>
                  <Link href={'/category'} onClick={() => logActivity('/catgory')}>Categories</Link>
                  <Link href={'/peer-favorites'} onClick={() => logActivity('/peer-favorites')}>Favorites</Link>
                  <Link href={'/upload'} onClick={() => logActivity('/upload')}>Submission</Link>
                  <Link href="mailto:ludi-help@illinois.edu">Contact</Link>
                  {user && user.role == "ADMIN" ? <Link href={'/admin'}>Admin</Link> : <></>}
              </Stack>





            <IconButton
              icon={useColorModeValue(<FaMoon />, <FaSun />)}
              bg={useColorModeValue('gray.200', 'gray.700')}
              color={useColorModeValue('gray.600', 'gray.300')}
              onClick={toggleColorMode}
            />

            {/* <Button
              display={{ base: 'none', md: 'inline-flex' }}
              leftIcon={<AiOutlineSearch />}
              fontWeight="medium"
              bg={useColorModeValue('gray.200', 'gray.700')}
              color={useColorModeValue('gray.400', 'gray.500')}
              w="2xs"
              justifyContent="flex-start"
              as="a"
              href="/search"
            >
              Search Resources
            </Button> */}

            <IconButton
              icon={<BiSearchAlt />}
              bg={useColorModeValue('gray.200', 'gray.700')}
              color={useColorModeValue('gray.600', 'gray.300')}
              as="a"
              href="/search"
            />

            {user ? (
              <UserMenu fullname={user.firstName + ' ' + user.lastName} />
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

            <MobileNav
              disclosures={{
                mobileNav,
                searchModal,
              }}
              bg={bg}
            />
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
};
