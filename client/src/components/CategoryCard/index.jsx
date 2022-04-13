import {
    chakra,
    Flex,
    LinkBox,
    LinkOverlay,
    useColorModeValue,
} from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    FilterOptions,
    URISearchParamOptions,
    TagOperatorOptions,
    SearchFieldOptions,
  } from '../../constants/filter.constant';
  
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
        mx="auto"
        position="relative"
        px={3}
        py={10}
        bg={useColorModeValue('gray.200', 'gray.700')}
        shadow="md"
        rounded="md"
        _hover={{
          background: useColorModeValue('gray.300', 'gray.600'),
        }}
      >
        <LinkOverlay href={`/search?${query}`}>
          <Flex justifyContent="center" alignItems="center">
            <chakra.span
              fontSize="s"
              color={useColorModeValue('gray.700', 'gray.400')}
            >
              {category}
            </chakra.span>
          </Flex>
          
        </LinkOverlay>
      </LinkBox>
    );
};