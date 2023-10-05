import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { DividerWithText } from './DividerWithText';
import { LoginForm } from './LoginForm';
import {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import {useHistory, useLocation} from "react-router-dom";
import moment from "moment";
export const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const search = location.search;
    if (search) {
      const match = search.match(/code=(.*?)&/);
      if (match && match[1]) {
        const auth_code = decodeURIComponent(match[1]);
        fetch(`${process.env.REACT_APP_API_URI}/get-google-info`, {
          method: 'POST',
          body: JSON.stringify({
            auth_code
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
            .then(async googleData => {
              const userData = jwt_decode(googleData.id_token);
              const result = await fetch(`${process.env.REACT_APP_API_URI}/google-login`, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              if (result.status === 400) {
                history.push(`/register?email=${userData.email}`);
                return;
              }

              const data = await result.json();
              setLoginData(data);
              const expiresIn = data.expiresIn;
              const expiresInAmount = Number(expiresIn.match(/\d+/)[0]);
              const expiresInUnit = expiresIn.match(/[a-zA-Z]+/)[0];
              localStorage.setItem('loginData', JSON.stringify(data));
              localStorage.setItem('id_token', data.token);
              localStorage.setItem('expires_at', moment().add(expiresInAmount, expiresInUnit).toDate().toString());

              window.location.href = '/';
            })
            .catch(err => {
              console.log(err);
            })
      }
    }
  }, [location]);

  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const handleClickGoogleLogin = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URI}/google-login`);
      const data = await res.json();
      if (data && data.url) {
        window.location.href = data.url;
      }
    } catch (err) {

    }
  }

  const onSuccess = async (googleData) => {
    const userData = jwt_decode(googleData.credential);

    const res = await fetch(`${process.env.REACT_APP_API_URI}/google-login`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 400) {
      history.push(`/register?email=${userData.email}`);
      return;
    }

    const data = await res.json();
    console.log(data)
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };

  const onFailure = (res) => {
      console.log('Login failed: res:', res);
  };

  return (
    <WithFooter>
      <Navbar />
      <Box
        w="full"
        maxW="xl"
        justifyContent="center"
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
          <Box mb="8" textAlign={{ base: 'center', md: 'start' }}>
            <Heading size="lg" mb="2" fontWeight="extrabold">
              Welcome back
            </Heading>
            <Text
              fontSize="lg"
              color={mode('gray.500', 'gray.400')}
              fontWeight="medium"
            >
              Enter your info to log in
            </Text>
          </Box>
          <Stack spacing="4">
            <Button
                onClick={handleClickGoogleLogin}
                borderColor={'gray.400'}
                variant="outline"
                leftIcon={<Box as={FaGoogle} color="red.500" />}
            >
              Log in with Google
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
    </WithFooter>
  );
};
