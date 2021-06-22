import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Icon,
  CloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';

// import {
//   AutoComplete,
//   AutoCompleteInput,
//   AutoCompleteItem,
//   AutoCompleteList,
// } from '@choc-ui/chakra-autocomplete';

export const SearchBar = ({ search }) => {
  let [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    search(searchTerm);
  };

  return (
    <Box
      maxW={{ base: 'md', md: '2xl' }}
      px={{ base: '6', md: '8' }}
      pt={20}
      mx="auto"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<AiOutlineSearch />} />
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <InputRightElement>
          <CloseButton
            size="sm"
            onClick={(e) => handleSearch(e.target.value)}
          />
        </InputRightElement>
      </InputGroup>

      {/* <AutoComplete rollNavigation>
        {({ isOpen }) => (
          <>
            <InputGroup>
              <AutoCompleteInput
                variant="filled"
                placeholder="Search..."
                // value={searchInput}
                // onKeyDown={handleSearchSubmit}
                // onChange={(e) => setSearchInput(e.target.value)}
              />
              <InputRightElement
                children={
                  <Icon as={isOpen ? ChevronRightIcon : ChevronDownIcon} />
                }
              />
            </InputGroup>
            <AutoCompleteList>
              {options.map((option, oid) => (
                <AutoCompleteItem
                  key={`option-${oid}`}
                  value={option}
                  textTransform="capitalize"
                  align="center"
                >
                  {option}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </>
        )}
      </AutoComplete> */}
    </Box>
  );
};
