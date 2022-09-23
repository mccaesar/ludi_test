import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  Box,
  Button,
  IconButton,
  CloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { URISearchParamOptions } from '../../constants/filter.constant';
import { SearchIcon } from '@chakra-ui/icons';

export const SearchBar = () => {
  const history = useHistory();
  const url = useLocation();
  const query = new URLSearchParams(url.search);

  const [searchTerm, setSearchTerm] = useState('');

  useEffectOnce(() => {
    const initialSearchTerm = query.get(URISearchParamOptions.SearchTerm);
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
  });

  const handleSearch = (e) => {
    // if (e.code === 'Enter') {
    //   e.preventDefault();
    //   query.set(URISearchParamOptions.SearchTerm, searchTerm);
    //   history.push(`/search?${query}`);
    // }
    e.preventDefault();
    query.set(URISearchParamOptions.SearchTerm, searchTerm);
    history.push(`/search?${query}`);
  };

  const handleEnter = (e) => {
    if (e.code === 'Enter' || e.code === 'Go' || e.code === 'Next') {
      e.preventDefault();
      query.set(URISearchParamOptions.SearchTerm, searchTerm);
      history.push(`/search?${query}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    query.delete(URISearchParamOptions.SearchTerm);
    history.push(`/search?${query}`);
  };

  return (
    <Box
      maxW={{ base: 'md', md: '2xl' }}
      px={{ base: '6', md: '8' }}
      pt={6}
      mx="auto"
    >
      <InputGroup>
        {/* <InputLeftElement pointerEvents="none" children={<AiOutlineSearch />} > */}
        <InputLeftElement>
          <IconButton icon={<SearchIcon/>} onClick={handleSearch } variant='link'></IconButton>
        </InputLeftElement>
        <Input
          tabIndex="0"
          bg={useColorModeValue('gray.100', 'gray.800')}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleEnter}
          rounded="full"
        />
        
        <InputRightElement>
          <CloseButton size="sm" onClick={clearSearch} />
        </InputRightElement>
      </InputGroup>
      
    </Box>
  );
};
