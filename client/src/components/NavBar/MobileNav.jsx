import {
  Box,
  VStack,
  Button,
  IconButton,
  CloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';

export const MobileNav = ({ disclosures, bg }) => {
  const { mobileNav, searchModal } = disclosures;
  return (
    <Box display={{ base: 'inline-flex', md: 'none' }}>
      <IconButton
        icon={<AiOutlineSearch />}
        display={{ base: 'inline-flex', md: 'none' }}
        mx={{ base: '4', md: '6' }}
        colorScheme="brand"
        isRound="true"
        onClick={searchModal.onOpen}
      />
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        aria-label="Open menu"
        fontSize="20px"
        color={useColorModeValue('gray.800', 'inherit')}
        variant="ghost"
        icon={<AiOutlineMenu />}
        onClick={mobileNav.onOpen}
      />
      <VStack
        pos="absolute"
        top={0}
        left={0}
        right={0}
        display={mobileNav.isOpen ? 'flex' : 'none'}
        flexDirection="column"
        p={2}
        pb={4}
        m={2}
        bg={bg}
        spacing={3}
        rounded="sm"
        shadow="sm"
      >
        <CloseButton
          aria-label="Close menu"
          justifySelf="self-start"
          onClick={mobileNav.onClose}
        />
        <Button
          w="full"
          variant="ghost"
          // onClick={mobileNav.onClose}
          href="login"
        >
          Sign In
        </Button>
        <Button
          w="full"
          colorScheme="brand"
          // onClick={mobileNav.onClose}
          href="/register"
        >
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
};
