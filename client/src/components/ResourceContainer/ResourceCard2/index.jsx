import {
  chakra,
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import slugify from '../../../utils/slugify.util'

import { Divider } from '@chakra-ui/react'

import {
  List,
  ListItem,
  ListIcon,
  Link
} from '@chakra-ui/react'

import { MdCheckCircle } from 'react-icons/md'

export const ResourceCard2 = ({ resource }) => {
  return (
    <LinkBox
      w="full"
      h="full"
      maxW="xl"
      minW="sm"
      mx="auto"
      position="relative"
      px={4}
      bg={useColorModeValue('gray.200', 'gray.700')}
      shadow="md"
      rounded="md"
    >

      <LinkOverlay>
        <Box>
          <chakra.h1
            fontSize="xl"
            fontWeight="bold"
            mt={2}
            color={useColorModeValue('black', 'white')}
          >

           <Link href={`/user/${resource._id}`}>  {resource.firstName} {resource.lastName} </Link> 
          </chakra.h1>

          <chakra.h3
            // fontSize="sm"
            mt={1}
            mb={1}
            color={useColorModeValue('gray.800', 'gray.300')}
          >
            {resource.title}
          </chakra.h3>

          <chakra.h3
            // fontSize="sm"
            mt={1}
            color={useColorModeValue('gray.800', 'gray.300')}
          >
            {resource.affiliation}
          </chakra.h3>

          <Divider />

          <chakra.p
            fontSize="sm"
            mt={2}
            mb={2}
            color={useColorModeValue('gray.800', 'gray.300')}
          >

        <List spacing={3}>
          {resource.favouriteResourcesPopulated.map((link) => (
          <ListItem key={link}>
            <ListIcon as={MdCheckCircle} color='green.500' /> 
            <Link href={`/resource/${link.index}`}  > {link.title} </Link> 
          </ListItem>    
          ))}

        </List>
            
          </chakra.p>
        </Box>
  
      </LinkOverlay>
    </LinkBox>
  );
};
