import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import {
  Box,
  Text,
  Stack,
  IconButton,
  Button,
  Tag,
  Grid,
  HStack,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

import { resourceApi } from '../../services';
import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';

export const ResourcePage = () => {
  const [isSaved, setSaved] = useState(false);
  const [resource, setResource] = useState(null);
  const { resourceId } = useParams();

  useEffectOnce(() => {
    resourceApi.getResourceByRID(resourceId).then((data) => {
      data.resource.tags = data.resource.tags
        .split(',')
        .map((tag) => tag.trim());
      setSaved(data.isSaved);
      setResource(data.resource);
    });
  });

  const handleSave = () => {
    if (!isSaved) {
      resourceApi.saveResource(resourceId);
    } else {
      resourceApi.unsaveResource(resourceId);
    }
    setSaved(!isSaved);
  };

  let title, author, description, longDescription, url, tags;
  if (resource) {
    ({ title, author, description, longDescription, url, tags } = resource);
  }

  return resource ? (
    <>
      <NavBar/>
      <Box p={2}></Box>
      <Stack
        bg={mode('white', 'gray.800')}
        overflow="hidden"
        p={6}
        rounded="md"
        maxW={{ base: '2xl', md: '6xl' }}
        h="full"
        justifyContent="center"
        mx="auto"
      >
        <Stack
          spacing={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="stretch"
          display="flex"
          bg={mode('gray.200', 'gray.700')}
          p={6}
          rounded="md"
        >
          <Box w="full">
            <Text fontSize="4xl" color={mode('black', 'white')}>
              {title}
            </Text>
            <Text fontSize="2xl" color={mode('gray.600', 'gray.300')}>
              {author}
            </Text>
            <HStack spacing={4} mt={8}>
              <Button
                as="a"
                href={url}
                target="_blank"
                color={mode('black', 'gray.300')}
                bg={mode('gray.400', 'gray.600')}
                variant="solid"
              >
                Website
              </Button>
              {/* <Button color="gray.300" bg="gray.600" variant="solid">
                Github
              </Button>
              <Button color="gray.300" bg="gray.600" variant="solid">
                Download
              </Button> */}
            </HStack>
          </Box>
          <IconButton
            variant="ghost"
            icon={!isSaved ? <FaRegBookmark /> : <FaBookmark />}
            onClick={handleSave}
            color={mode('black', 'white')}
            size="lg"
            _hover={{
              background: 'none',
            }}
          />
        </Stack>
        <HStack mt={8} bg={mode('gray.200', 'gray.700')} p={6} rounded="md">
          {console.log(tags)}
          {tags.map((tag) => (
            <Tag 
            color={mode('black', 'gray.300')}
            bg={mode('gray.400', 'gray.600')}>
              {tag}
            </Tag>
          ))}
        </HStack>
        <Box mt={8} bg={mode('gray.200', 'gray.700')} p={6} rounded="md">
          <Text color={mode('black', 'white')} fontSize="3xl" pb={4}>
            Description
          </Text>
          <Text color={mode('black', 'white')} pb={2}>
            {description}
          </Text>
          <Text color={mode('black', 'white')}>{longDescription}</Text>
        </Box>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={6}
          mt={8}
          bg={mode('gray.200', 'gray.700')}
          p={6}
          rounded="md"
        >
          <Box>
            <Text color={mode('gray.600', 'gray.400')}>Strengths</Text>
          </Box>
          <Box>
            <Text color={mode('gray.600', 'gray.400')}>Use Cases</Text>
          </Box>
        </Grid>
      </Stack>
      <Footer />
    </>
  ) : null;
};
