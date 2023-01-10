import { useParams } from "react-router-dom";
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




export const PasswordResetPage = () => {
  const { index:id } = useParams();
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
              Reset your password
            </Heading>

          </Box>

          <ResetForm  id={id}/>
        </Box>


      </Box>
    </WithFooter>
  );
};
