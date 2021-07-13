import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  SimpleGrid,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Footer } from '../../components/Footer';
import { NavBar } from '../../components/NavBar';
import { DividerWithText } from './DividerWithText';
import { LoginForm } from './LoginForm';

export const LoginPage = () => {
  return (
    <>
      <NavBar />
      <Box
        w="full"
        maxW="xl"
        justifyContent="center"
        mx="auto"
        py={{ base: '10', md: '20' }}
        px={{ base: '4', md: '10' }}
      >
        <Box
          bg={{ md: mode('white', 'gray.700') }}
          rounded={{ md: '2xl' }}
          p={{ base: '4', md: '12' }}
          borderWidth={{ md: '1px' }}
          borderColor={mode('gray.200', 'transparent')}
          shadow={{ md: 'lg' }}
        >
          {/* <Logo
                h="6"
                mb={{ base: '16', md: '10' }}
                iconColor="blue.600"
                mx={{ base: 'auto', md: 'unset' }}
              /> */}
          <Box mb="8" textAlign={{ base: 'center', md: 'start' }}>
            <Heading size="lg" mb="2" fontWeight="extrabold">
              Welcome back to Ludi
            </Heading>
            <Text
              fontSize="lg"
              color={mode('gray.600', 'gray.400')}
              fontWeight="medium"
            >
              Enter your info to log in
            </Text>
          </Box>
          <Stack spacing="4">
            <Button
              variant="outline"
              leftIcon={<Box as={FaGoogle} color="red.500" />}
            >
              Log in with Google
            </Button>
            <Button
              variant="outline"
              leftIcon={
                <Box
                  as={FaGithub}
                  // color={mode('github.500', 'github.300')}
                />
              }
            >
              Log in with Github
            </Button>
          </Stack>

          <DividerWithText>or</DividerWithText>
          <LoginForm />
        </Box>

        <Text mt="8" align="center" fontWeight="medium">
          Don't have an account?{' '}
          <Box
            as="a"
            href="/register"
            color={mode('blue.600', 'blue.200')}
            display={{ base: 'block', md: 'inline-block' }}
          >
            Sign up for free
          </Box>
        </Text>
      </Box>
      <Footer />
    </>
  );
};
