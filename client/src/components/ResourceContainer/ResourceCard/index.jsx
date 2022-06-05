import {
  chakra,
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
  Text,
  IconButton,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import slugify from '../../../utils/slugify.util'
import { useState } from 'react';
import { useEffect } from 'react';
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart } from 'react-icons/fa';
import { authApi } from '../../../services';
import { useResources } from '../../../hooks/useResources';
import { useUser } from '../../../hooks/useUser';

export const ResourceCard = ({ resourceBasic, showLikeButton }) => {
  const { index, title, category, description, upvoteCount } = resourceBasic;
  const [isSaved, setSaved] = useState(false);
  const [isUpvoted, setUpvoted] = useState(false);
  const [resource, setResource] = useState(null);
  const [alertIsOpen, setAlertIsOpen] = useState(false);

  const {
    resources,
    saveResourceMutation,
    unsaveResourceMutation,
    upvoteResourceMutation,
    unupvoteResourceMutation,
  } = useResources();
  const {
    savedResources,

    upvotedResources,
  } = useUser();

  const isLoggedIn = authApi.isLoggedIn();

  useEffect(() => {
    if (resources) {
      setResource(
        resources.find(
          (currentResource) =>
            String(currentResource.index) === String(index)
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
      {showLikeButton ? (<Box>
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
          {upvoteCount}
        </Text>
        <IconButton
          variant="ghost"
          icon={!isSaved ? <FaRegBookmark /> : <FaBookmark />}
          onClick={handleSave}
          color={mode('black', 'white')}
          size="lg"
          _hover={{}}
          _focus={{}}
        />
      </Box>) : null}
    </LinkBox>
  );
};
