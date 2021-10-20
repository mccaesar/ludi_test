import { useState } from 'react';
import styled from 'styled-components';
import { Flex, useColorModeValue as mode } from '@chakra-ui/react';
import { MdKeyboardArrowUp } from 'react-icons/md';

import { useComments } from '../../../hooks/useComments';
import { useUser } from '../../../hooks/useUser';

export let Rating = (props) => {
  const { comment } = props;
  const { user } = useUser();
  const { upvoteCommentMutation, unupvoteCommentMutation } = useComments();

  const [count, setCount] = useState(comment.upvoteCount);
  const [isUpvoted, setUpvoted] = useState(
    user ? user.upvotedComments.includes(comment._id) : false
  );

  const handleUpvote = () => {
    if (!isUpvoted) {
      upvoteCommentMutation.mutate(comment._id);
      setCount(count + 1);
    } else {
      unupvoteCommentMutation.mutate(comment._id);
      setCount(count - 1);
    }
    setUpvoted(!isUpvoted);
  };

  return (
    <Flex flexDirection="column" mr="12px" {...props}>
      {user ? (
        <button
          className={`material-icons ${isUpvoted ? 'selected' : ''}`}
          id="upvote"
          onClick={() => handleUpvote()}
        >
          <MdKeyboardArrowUp />
        </button>
      ) : null}
      <div className={`count ${isUpvoted ? 'up' : ''}`}>
        {isUpvoted ? count : ''}
        {isUpvoted ? '' : count}
      </div>
    </Flex>
  );
};

Rating = styled(Rating)`
  .count {
    font-weight: bold;
    text-align: center;
    color: #3d4953;

    &.up {
      color: #4f9eed;
    }
  }

  button#upvote,
  button#downvote {
    border: none;
    background: none;
    cursor: pointer;
    color: #3d4953;
    font-size: large;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                      supported by Chrome and Opera */
  }

  #upvote.selected {
    color: #4f9eed;
  }
`;
