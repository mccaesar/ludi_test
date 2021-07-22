// import { useState, useRef } from 'react';
// import {
//   Box,
//   InputGroup,
//   InputRightElement,
//   Modal,
//   ModalContent,
//   ModalOverlay,
//   Icon,
//   useColorModeValue as mode,
// } from '@chakra-ui/react';
// import {
//   AutoComplete,
//   AutoCompleteInput,
//   AutoCompleteItem,
//   AutoCompleteList,
// } from '@choc-ui/chakra-autocomplete';
// import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

// export const SearchModal = ({ search, disclosure }) => {
//   const initialRef = useRef();
//   const { isOpen, onClose } = disclosure;
//   let [searchTerm, setSearchTerm] = useState('');
//   const options = ['apple', 'appoint', 'zap', 'cap', 'japan'];

//   // const handleSubmit = (e) => {
//   //   if (e.code === 'Enter') {
//   //     e.preventDefault();
//   //     search(searchTerm);
//   //     setSearchTerm('');
//   //   }
//   // };

//   return (
//     <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent maxW={{ base: 'xl', md: '4xl' }}>
//         <Box
//           bg={{ md: mode('white', 'gray.700') }}
//           rounded={{ md: '2xl' }}
//           p={{ base: '4', md: '12' }}
//           borderWidth={{ md: '1px' }}
//           borderColor={mode('gray.200', 'transparent')}
//           shadow={{ md: 'lg' }}
//         >
//           <AutoComplete rollNavigation>
//             {({ isOpen }) => (
//               <>
//                 <InputGroup>
//                   <AutoCompleteInput variant="filled" placeholder="Search..." />
//                   <InputRightElement
//                     children={
//                       <Icon as={isOpen ? ChevronRightIcon : ChevronDownIcon} />
//                     }
//                   />
//                 </InputGroup>
//                 <AutoCompleteList>
//                   {options.map((option, oid) => (
//                     <AutoCompleteItem
//                       key={`option-${oid}`}
//                       value={option}
//                       textTransform="capitalize"
//                       align="center"
//                     >
//                       {option}
//                     </AutoCompleteItem>
//                   ))}
//                 </AutoCompleteList>
//               </>
//             )}
//           </AutoComplete>
//         </Box>
//       </ModalContent>
//     </Modal>
//   );
// };
