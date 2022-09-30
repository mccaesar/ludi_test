import {
  chakra,
  Center,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from '@chakra-ui/react';

import axios from 'axios';
import { API_URI } from '../../config';
import { useUser } from '../../hooks/useUser';

export const LinkArea = ({ text }) => {

  const { user } = useUser();

  const logActivity = () => {
    const url = `/peer-favorites`;
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
    <LinkBox
      w="full"
      h="full"
      maxW="xl"
      minW="sm"
      mx="auto"
      position="relative"
      px={4}
      py={3}
      bg={useColorModeValue('gray.200', 'gray.700')}
      shadow="md"
      rounded="md"
      _hover={{
        background: useColorModeValue('gray.300', 'gray.600'),
      }}
      onClick={logActivity}
    >
      {/*may need history.push(`/search?${searchParams}`); */}
      <LinkOverlay href={'/peer-favorites'}>
        <Center>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            color={useColorModeValue('gray.700', 'gray.400')}
            align="center"
          >
            {text}
          </chakra.h1>
        </Center>
      </LinkOverlay>
    </LinkBox>
  );
};
