import { Box, SimpleGrid, useColorModeValue as mode } from '@chakra-ui/react';
import { ResourceCard } from './ResourceCard';

export const ResourceContainer = ({ resources }) => {
  // const { isLoading, resources } = useSelector((state) => state.resources);

  return (
    <>
      {resources && resources.length > 0 ? (
        <Box
          as="section"
          bg={mode('gray.50', 'gray.800')}
          px={{ base: '6', md: '8' }}
          // py={{ base: '10', sm: '24' }}
          maxW={{ base: 'xl', md: '7xl' }}
          mx="auto"
        >
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="12" mb="10">
            {resources.map((resource) => (
              <ResourceCard resource={resource} key={resource._id} />
            ))}
          </SimpleGrid>
        </Box>
      ) : null}
    </>
  );
};
