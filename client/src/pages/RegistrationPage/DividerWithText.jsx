import {
  Divider,
  HStack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';

export const DividerWithText = (props) => (
  <HStack my="8" {...props}>
    <Divider borderColor={mode('gray.600', 'gray.200')} />
    <Text
      px="3"
      textTransform="uppercase"
      fontSize="sm"
      fontWeight="semibold"
      color={mode('gray.600', 'gray.200')}
    >
      {props.children}
    </Text>
    <Divider borderColor={mode('gray.600', 'gray.200')} />
  </HStack>
);
