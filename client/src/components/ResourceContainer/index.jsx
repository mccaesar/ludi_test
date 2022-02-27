import { Box, SimpleGrid, useColorModeValue as mode } from '@chakra-ui/react';
import { ResourceCard } from './ResourceCard';
import { ResourceCard2 } from './ResourceCard2';
import { FilterType } from '../../constants/commonVariable';


export const ResourceContainer = ({ resources, type }) => {
  if(type === FilterType.SHOW_RESOURCES){
    return (
      <>
        {resources && resources.length ? (
          <Box
            as="section"
            bg={mode('white', 'gray.800')}
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
  }else{
    return (
      <>
        {resources && resources.length ? (
          <Box
            as="section"
            bg={mode('white', 'gray.800')}
            px={{ base: '6', md: '8' }}
            // py={{ base: '10', sm: '24' }}
            maxW={{ base: 'xl', md: '7xl' }}
            mx="auto"
          >
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="12" mb="10">
              {resources.map((resource) => (
                <ResourceCard2 resource={resource} key={resource._id} />
              ))}
            </SimpleGrid>
          </Box>
        ) : null}
      </>
    );
  }

};
