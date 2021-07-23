import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';
import { DividerWithText } from './DividerWithText';
import { RegistrationForm } from './RegistrationForm';

export const RegistrationPage = () => {
  return (
    <>
      <NavBar />
      <Box
        w="full"
        maxW="xl"
        justifyConten="center"
        mx="auto"
        py={{ base: '10', md: '20' }}
        px={{ base: '4', md: '10' }}
      >
        <Box
          bg={{ md: mode('gray.200', 'gray.700') }}
          rounded={{ md: '2xl' }}
          p={{ base: '4', md: '12' }}
          borderWidth={{ md: '1px' }}
          borderColor={mode('transparent', 'transparent')}
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
              Welcome to Ludi
            </Heading>
            <Text
              fontSize="lg"
              color={mode('gray.500', 'gray.400')}
              fontWeight="medium"
            >
              Enter your info to get started
            </Text>
          </Box>
          <Stack spacing="4">
            <Button
              borderColor={mode('gray.400', 'gray.600')}
              variant="outline"
              leftIcon={<Box as={FaGoogle} color="red.500" />}
            >
              Sign up with Google
            </Button>
            <Button
              borderColor={mode('gray.400', 'gray.600')}
              variant="outline"
              leftIcon={
                <Box
                  as={FaGithub}
                  // color={mode('github.500', 'github.300')}
                />
              }
            >
              Sign up with Github
            </Button>
          </Stack>

          <DividerWithText>or</DividerWithText>
          <RegistrationForm />
        </Box>

        <Text mt="8" align="center" fontWeight="medium">
          Already have an account?{' '}
          <Box
            as="a"
            href="/login"
            color={mode('blue.600', 'blue.200')}
            display={{ base: 'block', md: 'inline-block' }}
          >
            Log in to Ludi
          </Box>
        </Text>
      </Box>
      <Footer />
    </>
  );
};
