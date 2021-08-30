import {
  chakra,
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import slugify from '../../../utils/slugify.util'

export const ResourceCard = ({ resource }) => {
  const { index, title, category, description } = resource;

  return (
    <LinkBox
      w="full"
      h="full"
      maxW="xl"
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
      <LinkOverlay href={`/resource/${index}/${slugify(title)}`}>
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue('gray.700', 'gray.400')}
          >
            {category}
          </chakra.span>
          {/* <chakra.span
          bg={useColorModeValue('brand.200', 'brand.300')}
          color={useColorModeValue('brand.800', 'brand.900')}
          px={3}
          py={1}
          rounded="full"
          textTransform="uppercase"
          fontSize="xs"
          >
          {category}
        </chakra.span> */}
          {/* <Flex alignItems="center" justifyContent="center" mt={6}>
          <IconButton
            aria-label="Save story"
            icon={true ? <AiOutlineHeart /> : <AiFillHeart />}
            variant="ghost"
            isRound
            size="sm"
            // position="absolute"
            // bottom={0}
            // onClick={handleFavoriteClick}
            />
          </Flex> */}
        </Flex>

        <Box>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            mt={2}
            color={useColorModeValue('black', 'white')}
          >
            {title}
          </chakra.h1>
          <chakra.p
            fontSize="sm"
            mt={2}
            color={useColorModeValue('gray.800', 'gray.300')}
          >
            {description}
          </chakra.p>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};
