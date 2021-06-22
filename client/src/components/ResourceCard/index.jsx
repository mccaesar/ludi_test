import {
  chakra,
  Box,
  Flex,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

export const ResourceCard = ({ resource }) => {
  const { _id: id, title, category, description, url } = resource;

  return (
    <Box
      w="full"
      h="full"
      maxW="sm"
      mx="auto"
      position="relative"
      px={4}
      py={3}
      bg={useColorModeValue('white', 'gray.700')}
      shadow="md"
      rounded="md"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <chakra.span
          fontSize="sm"
          color={useColorModeValue('gray.800', 'gray.400')}
        >
          Online Resources
        </chakra.span>
        <chakra.span
          bg={useColorModeValue('brand.200', 'brand.300')}
          color={useColorModeValue('brand.800', 'brand.900')}
          px={3}
          py={1}
          rounded="full"
          textTransform="uppercase"
          fontSize="xs"
        >
          {category}
        </chakra.span>
      </Flex>

      <Box>
        <chakra.h1
          fontSize="lg"
          fontWeight="bold"
          mt={2}
          color={useColorModeValue('gray.800', 'white')}
        >
          {title}
        </chakra.h1>
        <chakra.p
          fontSize="sm"
          mt={2}
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          {description}
        </chakra.p>
      </Box>

      <Flex alignItems="center" justifyContent="center" mt={6}>
        <IconButton
          aria-label="Save story"
          icon={true ? <AiOutlineHeart /> : <AiFillHeart />}
          variant="ghost"
          isRound
          size="sm"
          position="absolute"
          bottom={0}
          // onClick={handleFavoriteClick}
        />
      </Flex>
    </Box>
  );
};
