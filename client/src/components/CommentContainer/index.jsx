import { useState } from 'react';
import {
  Spinner,
  Center,
  Box,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { Comment } from './Comment';
import { Reply } from './Reply';
import { CommentContext } from '../../contexts/CommentContext';
import { useComments } from '../../hooks/useComments';
import { useUser } from '../../hooks/useUser';
import { userApi } from '../../services';
import { useQuery } from 'react-query';

export const CommentContainer = ({ resourceId }) => {
  const [replying, setReplying] = useState([]);
  //   const [editing, setEditing] = useState([]);
  const { commentsByResourceId } = useComments(resourceId);

  const displayComments = (comments, colorIdx, path) => {
    return comments.map((comment, i) => {
      return (
        <Comment
          comment={comment}
          colorIdx={colorIdx}
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
          <CommentContext.Provider value={[replying, setReplying]}>
            <Reply resource={resourceId} />
            {displayComments(commentsByResourceId, 0, [])}
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
