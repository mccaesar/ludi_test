import { useState, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useColorModeValue as mode,
} from '@chakra-ui/react';

// import {
//   AutoComplete,
//   AutoCompleteInput,
//   AutoCompleteItem,
//   AutoCompleteList,
// } from '@choc-ui/chakra-autocomplete';

export const SearchModal = ({ search, isOpen, onClose }) => {
  const initialRef = useRef();
  let [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      search(searchTerm);
      setSearchTerm('');
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent maxW={{ base: 'xl', md: '4xl' }}>
        <Box
          bg={{ md: mode('white', 'gray.700') }}
          rounded={{ md: '2xl' }}
          p={{ base: '4', md: '12' }}
          borderWidth={{ md: '1px' }}
          borderColor={mode('gray.200', 'transparent')}
          shadow={{ md: 'lg' }}
        >
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch />}
            />
            <Input
              variant="filled"
              value={searchTerm}
              ref={initialRef}
              placeholder="Search Resources..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSubmit}
            />
          </InputGroup>
        </Box>
      </ModalContent>
    </Modal>
  );
};
