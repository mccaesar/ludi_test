import { useState, useEffect, useContext, createContext } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import styled from 'styled-components';
import TextArea from 'react-textarea-autosize';
import {
  Spinner,
  Center,
  Button,
  Box,
  Text,
  Flex,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { MdKeyboardArrowUp } from 'react-icons/md';

import Markdown from './Markdown';
import { useComments } from '../../hooks/useComments';
import { useUser } from '../../hooks/useUser';
import { userApi } from '../../services';
import { useQuery } from 'react-query';

const CommentContext = createContext({});

function compare(a1, a2) {
  if (JSON.stringify(a1) === JSON.stringify(a2)) {
    return true;
  }
  return false;
}

function displayComments(comments, colorIdx, path) {
  return comments.map((comment, i) => {
    return (
      <Comment
        comment={comment}
        colorIdx={colorIdx}
        key={i}
        path={[...path, i]}
      />
    );
  });
}

function Reply(props) {
  const { comment } = props;
  //   console.log(comment, isEdit);
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  //   const { user } = useContext(CommentContext);
  const { user } = useUser();
  const { createCommentMutation, editCommentMutation } = useComments();

  const handleCreate = () => {
    createCommentMutation.mutate({
      resource: comment?.resource || props.resource,
      content: text,
      parents: comment?.parents || [],
    });
    setDone(true);
  };

  const handleEdit = () => {
    editCommentMutation.mutate({
      commentId: comment._id,
      content: text,
    });
  };

  return user ? (
    <Box
      borderRadius="8px"
      border="2px"
      borderColor="#3d4953"
      overflow="hidden"
      mb={4}
      display={done ? 'none' : ''}
      {...props}
    >
      <TextArea
        placeholder="What are your thoughts?"
        minRows={2}
        defaultValue={text}
        onChange={(value) => {
          setText(value.target.value);
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
}

Reply = styled(Reply)`
//   border-radius: 8px;
//   border: solid 1px #3d4953;
//   overflow: hidden;

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

//   .panel {
//     display: flex;
//     align-items: center;
//     background: #3d4953;
//     padding: 8px;

//     .comment_as {
//       font-size: 14px;
//       color: #cccccc;
//       margin-right: 8px;

//       .username {
//         display: inline-block;
//         color: #4f9eed;
//       }
//     }

//     ${Button} {
//       font-size: 14px;
//       margin-left: auto;
//     }
  }
`;

function Rating(props) {
  const { comment } = props;

  //   const { user } = useContext(CommentContext);
  const { user } = useUser();
  const { upvoteCommentMutation, unupvoteCommentMutation } = useComments();

  const [count, setCount] = useState(comment.upvoteCount);
  const [isUpvoted, setUpvoted] = useState(
    user.upvotedComments.includes(comment._id)
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
      <button
        className={`material-icons ${isUpvoted ? 'selected' : ''}`}
        id="upvote"
        onClick={() => handleUpvote()}
      >
        <MdKeyboardArrowUp />
      </button>
      <div className={`count ${isUpvoted ? 'up' : ''}`}>
        {isUpvoted ? count : ''}
        {isUpvoted ? '' : count}
      </div>
    </Flex>
  );
}

Rating = styled(Rating)`
  //   display: flex;
  //   flex-direction: column;
  //   margin-right: 12px;

  .count {
    font-weight: bold;
    text-align: center;
    color: #3d4953;

    &.up {
      color: #4f9eed;
    }

    // &.down {
    //   color: #ed4f4f;
    // }
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

  //   #downvote.selected {
  //     color: #ed4f4f;
  //   }
`;

function Comment(props) {
  const { comment, colorIdx, path } = props;
  //   const { replyingContext, user } = useContext(CommentContext);
  const [replying, setReplying] = useContext(CommentContext);
  const { user } = useUser();
  //   const [editing, setEditing] = editingContext;
  const [minimized, setMinimized] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { deleteCommentMutation } = useComments();
  const ownComment = compare(user._id, comment.author._id);

  useEffect(() => {
    if (path.length > 4 && path.length % 2 === 0) {
      setHidden(true);
    }
    if (path[path.length - 1] > 5) {
      setHidden(true);
    }
  }, [path]);

  const handleDelete = () => {
    deleteCommentMutation.mutate(comment._id);
  };

  return (
    <div {...props}>
      {hidden ? (
        <button
          id="showMore"
          onClick={() => {
            setHidden(false);
          }}
        >
          Show More Replies
        </button>
      ) : (
        <>
          <div id="left" className={minimized ? 'hidden' : ''}>
            <Rating comment={comment} />
          </div>
          <div id="right">
            <div id="top">
              <span
                className="minimize"
                onClick={() => {
                  setMinimized(!minimized);
                }}
              >
                [{minimized ? '+' : '-'}]
              </span>
              <span id="username">
                <a href="">{comment.author.screenName}</a>
              </span>
              <span id="date">
                <a href="">
                  {formatDistanceToNowStrict(new Date(comment.createdAt))}
                </a>
              </span>
            </div>
            <div id="content" className={minimized ? 'hidden' : ''}>
              <Markdown options={{ forceBlock: true }}>
                {comment.content}
              </Markdown>
            </div>
            <div id="actions" className={minimized ? 'hidden' : ''}>
              <span
                className={`${compare(replying, path) ? 'selected' : ''}`}
                onClick={() => {
                  if (compare(replying, path)) {
                    setReplying([]);
                  } else {
                    setReplying(path);
                  }
                }}
              >
                reply
              </span>
              {ownComment ? (
                <>
                  {/* <span
                    className={`${
                      ownComment && compare(editing, path) ? 'selected' : ''
                    }`}
                    onClick={() => {
                      if (compare(editing, path)) {
                        setEditing([]);
                      } else {
                        setEditing(path);
                      }
                    }}
                  >
                    edit
                  </span> */}
                  <span onClick={() => handleDelete()}>delete</span>
                </>
              ) : null}
            </div>
            <Reply
              className={compare(replying, path) && !minimized ? '' : 'hidden'}
              comment={comment}
              isEdit="false"
            />
            {/* {ownComment ? (
              <Reply
                className={
                  ownComment && compare(editing, path) && !minimized
                    ? ''
                    : 'hidden'
                }
                comment={comment}
                isEdit="true"
              />
            ) : null} */}
            {comment.replies ? (
              <div className={`comments ${minimized ? 'hidden' : ''}`}>
                {displayComments(comment.replies, colorIdx + 1, [...path])}
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

Comment = styled(Comment)`
  display: flex;
  text-align: left;
  background: ${(props) => (props.colorIdx % 2 === 0 ? '#161C21' : '#13181D')};
  padding: 16px 16px 16px 12px;
  //   border: 0.1px solid #3d4953;
  border-radius: 8px;
  margin-bottom: 4px;

  #showMore {
    background: none;
    border: none;
    color: #53626f;
    cursor: pointer;
    font-size: 13px;
    text-align: left;

    &:hover {
      text-decoration: underline;
    }
  }

  .comments {
    > * {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0px;
      }
    }

    &.hidden {
      display: none;
    }
  }

  #left {
    text-align: center;
    &.hidden {
      visibility: hidden;
      height: 0;
    }
  }

  #right {
    flex-grow: 1;

    #top {
      .minimize {
        cursor: pointer;
        color: #53626f;

        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
      }

      #username {
        color: #4f9eed;
      }

      #date {
        display: inline-block;
        color: #53626f;
      }

      > * {
        margin-right: 8px;
      }
    }

    #content {
      color: #cccccc;

      &.hidden {
        display: none;
      }
    }

    #actions {
      color: #53626f;
      margin-bottom: 12px;

      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */

      &.hidden {
        display: none;
      }

      .hidden {
        display: none;
      }

      > .selected {
        font-weight: bold;
      }

      > * {
        cursor: pointer;
        margin-right: 8px;
      }
    }
  }

  ${Reply} {
    margin-bottom: 12px;
  }
`;

export const CommentSection = ({ resourceId }) => {
  const [replying, setReplying] = useState([]);
  //   const [editing, setEditing] = useState([]);
  const { commentsByResourceId } = useComments(resourceId);

  return (
    <Box mt={8} bg={mode('gray.200', 'gray.700')} p={6} rounded="md">
      <Text color={mode('black', 'white')} fontSize="3xl" pb={4}>
        Comments
      </Text>
      {commentsByResourceId ? (
        <>
          <Reply resource={resourceId} />
          <CommentContext.Provider value={[replying, setReplying]}>
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

// export default styled(Comments)`
//   max-width: 750px;
//   min-width: min-content;

//   > * {
//     margin-bottom: 16px;

//     &:last-child {
//       margin-bottom: 0px;
//     }
//   }

//   #comments,
//   #comments_count {
//     font-weight: 900;
//     font-size: 20px;
//     display: inline-block;
//     margin-right: 4px;
//     margin-bottom: 8px;
//   }

//   #comments {
//     color: #ffffff;
//   }

//   #comments_count {
//     color: #53626f;
//   }
// `;
