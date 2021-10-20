import { useState, useContext } from 'react';
import styled from 'styled-components';
import TextArea from 'react-textarea-autosize';
import {
  Button,
  Box,
  Text,
  Flex,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { CommentContext } from '../../../contexts/CommentContext';
import { useComments } from '../../../hooks/useComments';
import { useUser } from '../../../hooks/useUser';

export let Reply = (props) => {
  const { comment } = props;
  //   console.log(comment, isEdit);
  const [text, setText] = useState('');

  //   const { user } = useContext(CommentContext);
  const [replying, setReplying] = useContext(CommentContext);
  const { user } = useUser();
  const { createCommentMutation, editCommentMutation } = useComments();

  const handleCreate = () => {
    createCommentMutation.mutate({
      resource: comment?.resource || props.resource,
      content: text,
      parents: comment?.parents || [],
    });
    setText('');
    setReplying([]);
  };

  const handleEdit = () => {
    editCommentMutation.mutate({
      commentId: comment._id,
      content: text,
    });
  };

  const handleKeyDown = (e, func) => {
    if (!e.shiftKey && e.key === 'Enter') {
      func();
    }
  };

  return user ? (
    <Box
      borderRadius="8px"
      border="2px"
      borderColor="#3d4953"
      overflow="hidden"
      mb={4}
      {...props}
    >
      <TextArea
        placeholder="What are your thoughts?"
        minRows={2}
        value={text}
        onKeyDown={(e) => handleKeyDown(e, handleCreate)}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding="8px"
        bg="#3d4953"
      >
        <Text fontWeight="semibold">
          Comment as{' '}
          <Text as="a" href="/user/profile" textColor="#4f9eed">
            {user.screenName}
          </Text>
        </Text>
        <Button
          size="sm"
          bg="#4f9eed"
          fontWeight="bold"
          onClick={() => {
            handleCreate();
          }}
          _hover={{ background: '#2e78c2' }}
        >
          COMMENT
        </Button>
      </Flex>
    </Box>
  ) : null;
};

Reply = styled(Reply)`
  &.hidden {
    display: none;
  }

  textarea {
    font-family: inherit;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    resize: none;

    background: #13181d;
    padding: 12px;
    color: #cccccc;
    border: none;
    max-width: 100%;
    min-width: 100%;
  }
`;
