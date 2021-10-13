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
import { useUser } from '../../hooks/useUser';

export const UserMenu = ({ fullname }) => {
  const { logoutMutation } = useUser();

  const handleLogout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        logoutMutation.mutate();
        resolve();
      }, 200);
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
            <Text
              fontSize="xs"
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              User
            </Text>
          </VStack>
        </HStack>
      </MenuButton>
      <MenuList
        bg={useColorModeValue('white', 'gray.900')}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        zIndex={1000}
      >
        <MenuItem as="a" href="/user/profile">
          Profile
        </MenuItem>
        {/* <MenuItem>Settings</MenuItem> */}
        <MenuDivider />
        <MenuItem onClick={handleLogout}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
};
