import {
  chakra,
  Center,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from '@chakra-ui/react';

export const CannedSearch = ({ searchParams, text }) => {
  return (
    <LinkBox
      w="full"
      h="full"
      // maxW="xl"
      minW="sm"
      mx="auto"
      position="relative"
      px={4}
      py={3}
      bg={useColorModeValue('gray.200', 'gray.700')}
      shadow="md"
      rounded="md"
      _hover={{
        background: useColorModeValue('gray.300', 'gray.600'),
      }}
    >
      {/*may need history.push(`/search?${searchParams}`); */}
      <LinkOverlay href={`/search?${searchParams}`}>
        {/*old: `/resource/${resourceId}` */}
        <Center>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            color={useColorModeValue('gray.700', 'gray.400')}
            align="center"
          >
            {text}
          </chakra.h1>
        </Center>
      </LinkOverlay>
    </LinkBox>
  );
};
