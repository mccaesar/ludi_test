import { useRef } from 'react';
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { DividerWithText } from './DividerWithText';
import { RegistrationForm } from './RegistrationForm';

export const RegistrationModal = ({ disclosure }) => {
  const initialRef = useRef();
  const { isOpen, onClose } = disclosure;
  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent maxW="xl">
        <ModalCloseButton />
        <Box
          bg={{ md: mode('white', 'gray.700') }}
          rounded={{ md: '2xl' }}
          p={{ base: '4', md: '12' }}
          borderWidth={{ md: '1px' }}
          borderColor={mode('gray.200', 'transparent')}
          shadow={{ md: 'lg' }}
        >
          <Box mb="8" textAlign={{ base: 'center', md: 'start' }}>
            <Heading size="lg" mb="2" fontWeight="extrabold">
              Welcome to Ludi
            </Heading>
            <Text
              fontSize="lg"
              color={mode('gray.600', 'gray.400')}
              fontWeight="medium"
            >
              Enter your info to get started
            </Text>
          </Box>
          <Stack spacing="4">
            <Button
              variant="outline"
              leftIcon={<Box as={FaGoogle} color="red.500" />}
            >
              Sign up with Google
            </Button>
            <Button
              variant="outline"
              leftIcon={
                <Box
                  as={FaGithub}
                  color={mode('facebook.500', 'facebook.300')}
                />
              }
            >
              Sign up with Github
            </Button>
          </Stack>

          <DividerWithText>or</DividerWithText>

          <RegistrationForm initialRef={initialRef} />

          <Text mt="8" align="center" fontWeight="medium">
            Already have an account?{' '}
            <Box
              as="a"
              href="#"
              color={mode('blue.600', 'blue.200')}
              display={{ base: 'block', md: 'inline-block' }}
            >
              Login to Ludi
            </Box>
          </Text>
        </Box>
      </ModalContent>
    </Modal>
  );
};
