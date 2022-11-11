import { useState, useContext, useEffect } from 'react';
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
  const [text, setText] = useState('');

  const {
    path: [selectedPath, setSelectedPath],
    edit: [isEdit, setEdit],
  } = useContext(CommentContext);

  const { user } = useUser();
  const { createCommentMutation, editCommentMutation } = useComments();

  useEffect(() => {
    if (comment && isEdit) {
      setText(comment.content);
    } else {
      setText('');
    }
  }, [isEdit, comment]);

  const handleCreate = () => {
    createCommentMutation.mutate({
      resource: comment?.resource || props.resource,
      content: text,
      parents: comment?.parents || [],
    });
  };

  const handleEdit = () => {
    editCommentMutation.mutate({
      commentId: comment._id,
      content: text,
    });
  };

  const handleSubmit = () => {
    if (text) {
      if (comment && isEdit) {
        handleEdit();
      } else {
        handleCreate();
      }
    }
    setText('');
    setSelectedPath([]);
    setEdit(false);
  };

  const handleKeyDown = (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return user ? (
    <Box
      borderRadius="8px"
      border="2px"
      borderColor={props.colorMode === "dark"? "#3d4953" : "gray.500"}
      overflow="hidden"
      mb={4}
      {...props}
    >
      <TextArea
        placeholder="What are your thoughts?"
        minRows={2}
        value={text}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding="8px"
        bg={mode('gray.400', "#3d4953")}
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
            handleSubmit();
          }}
          _hover={{ background: '#2e78c2' }}
        >
          {comment && isEdit ? 'DONE' : 'COMMENT'}
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

    background: ${(props) => (props.colorMode === "dark" ? '#161C21' : '#FFFFFF')};
    padding: 12px;
    color: ${(props) => (props.colorMode === "dark" ? '#cccccc' : '#000000')};
    border: none;
    max-width: 100%;
    min-width: 100%;
  }
`;
