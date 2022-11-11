import { useState } from 'react';
import {
  Spinner,
  Center,
  Box,
  Text,
  useColorModeValue as mode,
  useColorMode,
} from '@chakra-ui/react';

import { Comment } from './Comment';
import { Reply } from './Reply';
import { CommentContext } from '../../contexts/CommentContext';
import { useComments } from '../../hooks/useComments';

export const CommentContainer = ({ resourceId }) => {
  const [selectedPath, setSelectedPath] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const { commentsByResourceId } = useComments(resourceId);
  const { colorMode } = useColorMode();

  const displayComments = (comments, path) => {
    return comments.map((comment, i) => {
      return (
        <Comment
          comment={comment}
          colorMode={colorMode}
          key={i}
          path={[...path, i]}
          displayComments={displayComments}
        />
      );
    });
  };

  return (
    <Box mt={8} bg={mode('gray.200', 'gray.700')} p={6} rounded="md">
      <Text color={mode('black', 'white')} fontSize="3xl" pb={4}>
        Comments
      </Text>
      {commentsByResourceId ? (
        <>
          <CommentContext.Provider
            value={{ path: [selectedPath, setSelectedPath], edit: [isEdit, setEdit] }}
          >
            <Reply colorMode={colorMode} resource={resourceId} />
            {displayComments(commentsByResourceId, [])}
          </CommentContext.Provider>
        </>
      ) : (
        <Center>
          <Spinner />
        </Center>
      )}
    </Box>
  );
};
