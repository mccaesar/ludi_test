import {
  Avatar,
  Box,
  HStack,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

export const UserMenu = () => (
  <Menu closeOnBlur closeOnSelect>
    <MenuButton
      px={2}
      py={2}
      transition="all 0.3s"
      _focus={{ boxShadow: 'none' }}
    >
      <HStack>
        <Avatar size={'sm'} bg="teal.600" />
        <VStack
          display={{ base: 'none', md: 'flex' }}
          alignItems="flex-start"
          spacing="1px"
          ml="2"
        >
          <Text fontSize="sm">Vien Vuong</Text>
          <Text fontSize="xs" color="gray.600">
            Admin
          </Text>
        </VStack>
      </HStack>
    </MenuButton>
    <MenuList
      bg={useColorModeValue('white', 'gray.900')}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>Settings</MenuItem>
      <MenuDivider />
      <MenuItem>Sign out</MenuItem>
    </MenuList>
  </Menu>
);
