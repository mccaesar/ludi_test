import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { ResetForm } from './ResetForm';

export const PasswordRequestPage = () => {
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
            Trouble Logging In?
            </Heading>
            <Text
              fontSize="lg"
              color={mode('gray.500', 'gray.400')}
              fontWeight="medium"
            >
              Enter your email and we'll send you a link to get back into your account.
            </Text>
          </Box>

          <ResetForm/>
        </Box>


      </Box>
    </WithFooter>
  );
};
