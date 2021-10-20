import { useState, useEffect, useContext } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { useColorModeValue as mode } from '@chakra-ui/react';
import styled from 'styled-components';

import Markdown from '../Markdown';
import { Reply } from '../Reply';
import { Rating } from '../Rating';
import { CommentContext } from '../../../contexts/CommentContext';
import { useComments } from '../../../hooks/useComments';
import { useUser } from '../../../hooks/useUser';

export let Comment = (props) => {
  const { comment, colorIdx, path, displayComments } = props;
  //   const { replyingContext, user } = useContext(CommentContext);
  const [replying, setReplying] = useContext(CommentContext);
  const { user } = useUser();
  //   const [editing, setEditing] = editingContext;
  const [minimized, setMinimized] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { deleteCommentMutation } = useComments();
  const ownComment = user ? compare(user._id, comment.author._id) : false;

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
              {user ? (
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
              ) : null}
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
};

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

function compare(a1, a2) {
  if (JSON.stringify(a1) === JSON.stringify(a2)) {
    return true;
  }
  return false;
}
