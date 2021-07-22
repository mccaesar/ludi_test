import {
  chakra,
  Box,
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
      bg={useColorModeValue('white', 'gray.700')}
      shadow="md"
      rounded="md"
      _hover={{
        background: 'gray.600',
      }}
    >
      {/*may need history.push(`/search?${searchParams}`); */}
      <LinkOverlay href={`/search?${searchParams}`}>{/*old: `/resource/${resourceId}` */}
        <Box>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            //mt={2}
            color={useColorModeValue('gray.800', 'gray.200')}
            align="center"
          >
            {text}
          </chakra.h1>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};
