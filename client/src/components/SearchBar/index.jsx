import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  Box,
  CloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { useEffectOnce } from '../../hooks/useEffectOnce';

export const SearchBar = () => {
  const history = useHistory();
  const url = useLocation();
  const query = new URLSearchParams(url.search);

  const [searchTerm, setSearchTerm] = useState('');

  useEffectOnce(() => {
    setSearchTerm(query.get('q'));
  });

  const handleSearch = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (searchTerm) {
        query.set('q', searchTerm);
        history.push(`/search?${query}`);
      } else {
        history.push(`/search`);
      }
    }
  };

  const clear = () => {
    setSearchTerm('');
  };

  return (
    <Box
      maxW={{ base: 'md', md: '2xl' }}
      px={{ base: '6', md: '8' }}
      pt={6}
      mx="auto"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<AiOutlineSearch />} />
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          rounded="full"
        />
        <InputRightElement>
          <CloseButton size="sm" onClick={clear} />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
