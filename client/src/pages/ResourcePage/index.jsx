import { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Stack,
  IconButton,
  Button,
  Tag,
  Grid,
  HStack,
} from '@chakra-ui/react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResources } from '../../actions/resource.action';
import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';

export const ResourcePage = ({ match }) => {
  const [isSaved, setSaved] = useState(false);
  const { resources } = useSelector((state) => state.resources);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchResources());
  }, [dispatch]);

  const resource = resources[match.params.id];
  let title, author, description, longDescription, url, tags;
  if (resource) {
    ({ title, author, description, longDescription, url } = resource);
    tags = resource.tags.split(', ');
  }

  return resource ? (
    <>
      <NavBar />
      <Stack
        bg="gray.800"
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
          bg="gray.700"
          p={6}
          rounded="md"
        >
          <Box w="full">
            <Text fontSize="4xl" color="white">
              {title}
            </Text>
            <Text fontSize="2xl" color="gray.300">
              {author}
            </Text>
            <HStack spacing={4} mt={8}>
              <Button href={url} color="gray.300" bg="gray.600" variant="solid">
                Website
              </Button>
              <Button color="gray.300" bg="gray.600" variant="solid">
                Github
              </Button>
              <Button color="gray.300" bg="gray.600" variant="solid">
                Download
              </Button>
            </HStack>
          </Box>
          <IconButton
            variant="ghost"
            icon={!isSaved ? <FaRegBookmark /> : <FaBookmark />}
            onClick={() => setSaved(!isSaved)}
            color="white"
            size="md"
            _hover={{
              background: 'none',
            }}
          />
        </Stack>
        <HStack mt={8} bg="gray.700" p={6} rounded="md">
          {tags.map((tag) => (
            <Tag color="gray.300" bg="gray.600">
              {tag}
            </Tag>
          ))}
        </HStack>
        <Box mt={8} bg="gray.700" p={6} rounded="md">
          <Text color="white" fontSize="3xl" pb={4}>
            Description
          </Text>
          <Text color="white" pb={2}>
            {description}
          </Text>
          <Text color="white">{longDescription}</Text>
        </Box>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={6}
          mt={8}
          bg="gray.700"
          p={6}
          rounded="md"
        >
          <Box>
            <Text color="gray.400">Strengths</Text>
          </Box>
          <Box>
            <Text color="gray.400">Use Cases</Text>
          </Box>
        </Grid>
      </Stack>
      <Footer />
    </>
  ) : null;
};
