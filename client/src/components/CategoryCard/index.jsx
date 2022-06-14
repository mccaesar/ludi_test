import {
    chakra,
    Flex,
    LinkBox,
    LinkOverlay,
    useColorModeValue,
} from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    URISearchParamOptions,
    SearchFieldOptions,
  } from '../../constants/filter.constant';
import { CATEGORIES } from '../../categories';
  
export const CategoryCard = ({ category }) => {

    const history = useHistory();
    const url = useLocation();
    const query = new URLSearchParams(url.search);
    query.set(URISearchParamOptions.SearchField, SearchFieldOptions.Category);
    query.set(URISearchParamOptions.SearchTerm, category);
  
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
      >
        <LinkOverlay href={`/search?${query}`}>
          <Flex justifyContent="center" direction="column">
            <chakra.h1
              fontSize="lg"
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