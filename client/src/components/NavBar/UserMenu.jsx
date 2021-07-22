import { useDispatch } from 'react-redux';
import {
  Avatar,
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
import { logoutUser } from '../../actions/auth.action';

export const UserMenu = ({ fullname }) => {
  const dispatch = useDispatch();

  const handleLogout = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(logoutUser());
        resolve();
      }, 500);
    });
  };

  return (
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
            <Text fontSize="sm">{fullname}</Text>
            <Text fontSize="xs" color="gray.600">
              User
            </Text>
          </VStack>
        </HStack>
      </MenuButton>
      <MenuList
        bg={useColorModeValue('white', 'gray.900')}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <MenuItem as="a" href="/profile">
          Profile
        </MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuDivider />
        <MenuItem onClick={handleLogout}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
};
