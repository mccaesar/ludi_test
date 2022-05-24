import { useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import {
  chakra,
  Box,
  Text,
  Stack,
  IconButton,
  Button,
  Tag,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'

import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart, FaPen, FaTrash } from 'react-icons/fa';

import { Navbar } from '../../components/Navbar';
import { WithFooter } from '../../components/Footer';

import { CommentContainer } from '../../components/CommentContainer';

import { authApi } from '../../services';
import { useResources } from '../../hooks/useResources';
import { useUser } from '../../hooks/useUser';
import axios from 'axios';
import { API_URI } from '../../config';

export const ResourcePage = () => {
  const [isSaved, setSaved] = useState(false);
  const [isUpvoted, setUpvoted] = useState(false);
  const [resource, setResource] = useState(null);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const toast = useToast()

  const { index: resourceIdx } = useParams();
  const history = useHistory();

  const {
    resources,
    saveResourceMutation,
    unsaveResourceMutation,
    upvoteResourceMutation,
    unupvoteResourceMutation,
  } = useResources();
  const {
    savedResources,
    user,
    upvotedResources,
  } = useUser();

  const isLoggedIn = authApi.isLoggedIn();

  useEffect(() => {
    if (resources) {
      setResource(
        resources.find(
          (currentResource) =>
            String(currentResource.index) === String(resourceIdx)
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources]);

  useEffect(() => {
    if (resource && savedResources && savedResources.length) {
      setSaved(savedResources.includes(String(resource._id)));
    }
  }, [resource, savedResources]);

  useEffect(() => {
    if (resource && upvotedResources && upvotedResources.length) {
      setUpvoted(upvotedResources.includes(String(resource._id)));
    }
  }, [resource, upvotedResources]);

  const handleSave = () => {
    if (isLoggedIn) {
      if (!isSaved) {
        saveResourceMutation.mutate(resource._id);
      } else {
        unsaveResourceMutation.mutate(resource._id);
      }
      setSaved(!isSaved);
    } else {
      setAlertIsOpen(true);
    }
  };

  const handleEdit = () => {
    const path = `/edit/${resourceIdx}/`;
    history.push(path);
  }

  const handleUpvote = () => {
    if (isLoggedIn) {
      if (!isUpvoted) {
        upvoteResourceMutation.mutate(resource._id);
      } else {
        unupvoteResourceMutation.mutate(resource._id);
      }
      setUpvoted(!isUpvoted);
    } else {
      setAlertIsOpen(true);
    }
  };

  const deleteResource = () => {
    axios.delete(`${API_URI}/resource/${resource._id}/delete`).catch(function(error) {
      if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          toast({
            title: 'an error occured while deleting this resource',
            description: error.response.data.message,
            status: 'error',
            duration: 9000,
            position: 'bottom-right',
            isClosable: true,
          })
      }
    }).then(toast({
      title: 'successfully deleted resource',
      status: 'success',
      duration: 9000,
      position: 'bottom-right',
      isClosable: true,
    }));;
    history.push("/");
  }

  const tagSearch = new URLSearchParams();

  const NotLoggedInAlert = () => {
    const onClose = () => setAlertIsOpen(false);

    return (
      <>
        <AlertDialog isOpen={alertIsOpen} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogBody pt={8}>
                You must be logged in to save/upvote resources.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={onClose}>Ok</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  };
  
  const DeleteAlert = () => {

    return (
       <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogBody pt={8} textAlign="center">
                Are you sure you want to delete {resource.title}?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button colorScheme="red" mr={3} onClick={deleteResource}>Yes</Button>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
    )
  }


  return resource ? (
    <WithFooter>
      <Navbar />
      <NotLoggedInAlert />
      <DeleteAlert />
      <Stack
        bg={mode('white', 'gray.800')}
        overflow="hidden"
        rounded="md"
        maxW={{ base: '2xl', md: '6xl' }}
        justifyContent="center"
        h="full"
        mx="auto"
        mt={4}
        p={6}
      >
        <Stack
          spacing={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="stretch"
          display="flex"
          bg={mode('gray.200', 'gray.700')}
          rounded="md"
          p={6}
        >
          <Box w="full">
            <Text fontSize="4xl" color={mode('black', 'white')}>
              {resource.title}
            </Text>
            <Text
              fontSize="2xl"
              fontStyle="italic"
              color={mode('gray.600', 'gray.300')}
            >
              {resource.category}
            </Text>
            <Text fontSize="2xl" color={mode('gray.600', 'gray.300')}>
              {resource.author}
            </Text>
            <HStack spacing={4} mt={8}>
              <Button
                as="a"
                href={resource.url}
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
          <Box>
            <IconButton
              variant="ghost"
              icon={!isUpvoted ? <FaRegHeart /> : <FaHeart />}
              onClick={handleUpvote}
              color={mode('black', 'white')}
              size="lg"
              _hover={{}}
              _focus={{}}
            />
            <Text textAlign="center" fontSize="s">
              {resource.upvoteCount}
            </Text>
          </Box>
          <Box>
            <IconButton
              variant="ghost"
              icon={!isSaved ? <FaRegBookmark /> : <FaBookmark />}
              onClick={handleSave}
              color={mode('black', 'white')}
              size="lg"
              _hover={{}}
              _focus={{}}
            />
          </Box>
          {user && user.role == "ADMIN" ? <Box>
            <IconButton
              variant="ghost"
              icon={<FaPen/>}
              onClick={handleEdit}
              color={mode('black', 'white')}
              size="lg"
              _hover={{}}
              _focus={{}}
            />
          </Box>
           : <></>}
           {user && user.role == "ADMIN" ? <Box>
            <IconButton
              variant="ghost"
              icon={<FaTrash/>}
              onClick={onOpen}
              color={mode('black', 'white')}
              size="lg"
              _hover={{}}
              _focus={{}}
            />
          </Box>
           : <></>}
        </Stack>
        <HStack mt={8} bg={mode('gray.200', 'gray.700')} p={6} rounded="md">
          {resource.tags.map((tag) => {
            tagSearch.set('tag', tag);
            return (
              <Tag
                as="a"
                key={`tag-${tag}`}
                href={`/search?${tagSearch}`}
                color={mode('black', 'gray.300')}
                bg={mode('gray.400', 'gray.600')}
              >
                {tag}
              </Tag>
            );
          })}
        </HStack>
        <Box mt={8} bg={mode('gray.200', 'gray.700')} p={6} rounded="md">
          <Text color={mode('black', 'white')} fontSize="3xl" pb={4}>
            Description
          </Text>
          <Text color={mode('black', 'white')} pb={2}>
            {resource.description}
          </Text>
          <chakra.p color={mode('black', 'white')} whiteSpace = 'pre-line' 
              dangerouslySetInnerHTML={{ __html: resource.additionalDescription }}>
          </chakra.p>
        </Box>

        <CommentContainer resourceId={resource._id} />

        <Text pb={5}  textAlign='center' mx="auto" fontSize="lg">
          Do you have feedback or an improved description? Please email to ludi-help@illinois.edu.
        </Text>
      </Stack>
    </WithFooter>
  ) : null;
};
