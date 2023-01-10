import {
    chakra,
    Flex,
    LinkBox,
    LinkOverlay,
    useColorModeValue,
} from '@chakra-ui/react';
import { CATEGORIES } from '../../categories';

import axios from 'axios';
import { API_URI } from '../../config';
import { useUser } from '../../hooks/useUser';
  
export const CategoryCard = ({ category }) => {

  const { user } = useUser();

  const logActivity = () => {
    const url = `category/${encodeURIComponent(category)}`;
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
        minH="20"
        mx="auto"
        position="relative"
        px={5}
        py={5}
        bg={useColorModeValue('gray.200', 'gray.700')}
        shadow="md"
        rounded="md"
        _hover={{
          background: useColorModeValue('gray.300', 'gray.600'),
        }}
        onClick={logActivity}
      >
        <LinkOverlay href={`category/${encodeURIComponent(category)}`}>
          <Flex justifyContent="center" direction="column">
            <chakra.h1
              fontSize="lg"
              fontWeight={"bold"}
              color={useColorModeValue('black', 'white')}
            >
              {category}
            </chakra.h1>
            <chakra.span 
              fontSize="sm"
              mt={3}
              color={useColorModeValue('gray.800', 'gray.300')}>
              {CATEGORIES[category]}
            </chakra.span>
          </Flex>
          
        </LinkOverlay>
      </LinkBox>
    );
};