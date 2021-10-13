import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import db from '../models/index.js';

const router = express.Router();
const { Comment, Resource, User } = db;

const buildCommentTrees = (comments, rootDepth = 1) => {
  // Sort comments from "leaf" to "root"
  const sortByDepthDesc = (a, b) => {
    const a_depth = a.parents.length;
    const b_depth = b.parents.length;
    if (a_depth < b_depth) {
      return 1;
    }
    if (a_depth > b_depth) {
      return -1;
    }
    return 0;
  };

  comments.sort(sortByDepthDesc);

  const findParentIdxById = (parentId) => {
    const parent = comments.findIndex(
      (comment) => comment._id == String(parentId)
    );
    return parent;
  };

  let commentTrees = [];
  comments.forEach((comment) => {
    const depth = comment.parents.length;
    // If non-root comments then recursively build comment chain
    if (depth > rootDepth) {
      // Get immediate parent
      // depth - 2 because last element is the current comment itself
      const parentId = comment.parents[depth - 2];
      const parentIdx = findParentIdxById(parentId);
      let parentComment = comments[parentIdx];

      if (parentComment) {
        // If the replies array doesn't yet exist, create it
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        parentComment.replies.push(comment);
        return;
      } else {
        // If a parent message can't be found and we haven't yet
        // reached the root comment, we're missing part of the chain
        console.error('Broken reply chain.');
      }
    }
    // If root comments then add to return array
    else {
      commentTrees.push(comment);
    }
  });

  return commentTrees;
};

export const getComments = async (req, res, next) => {
  let { depthLimit } = req.params;
  if (!depthLimit) {
    /**
     * Default comment 5-layer deep:
     * root
     * | child
     * | | grandchild etc.
     */
    depthLimit = process.env.COMMENT_DEPTH_LIMIT;
  }

  try {
    const query = {};
    query[`parents.${depthLimit}`] = { $exists: false };

    const comments = await Comment.find(query).lean();
    const commentTrees = buildCommentTrees(comments);
    res.status(200).send(commentTrees);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while retrieving comments.',
    });
  }
};

export const getCommentById = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findOne({ _id: commentId });
    res.status(200).send(comment);
  } catch (err) {
    res.status(404).send({
      message:
        err.message ||
        `Some error occurred while retrieving comment with ID: ${commentId}.`,
    });
  }
};

export const getCommentChain = async (req, res, next) => {
  let { commentId, depthLimit } = req.params;
  if (!depthLimit) {
    depthLimit = process.env.COMMENT_DEPTH_LIMIT;
  }

  try {
    const rootComment = await Comment.findOne({ _id: commentId });
    const rootDepth = rootComment.parents.length;
    depthLimit = Number(depthLimit) + rootDepth - 1;

    const query = {};
    query['parents'] = commentId;
    query[`parents.${depthLimit}`] = { $exists: false };

    const comments = await Comment.find(query).lean();
    const commentTrees = buildCommentTrees(comments, rootDepth);
    res.status(200).send(commentTrees);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while retrieving comments.',
    });
  }
};

export const getCommentsByResourceId = async (req, res, next) => {
  const { resourceId } = req.params;
  let { depthLimit } = req.params;
  if (!depthLimit) {
    depthLimit = process.env.COMMENT_DEPTH_LIMIT;
  }

  try {
    const query = {};
    query['resource'] = resourceId;
    query[`parents.${depthLimit}`] = { $exists: false };

    const comments = await Comment.find(query)
      .populate('author', '_id screenName')
      .lean();
    const commentTrees = buildCommentTrees(comments);
    res.status(200).send(commentTrees);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while retrieving comments.',
    });
  }
};

export const getCommentsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const comments = await Comment.find({ author: userId }).lean();
    res.status(200).send(comments);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while retrieving comments.',
    });
  }
};

export const createComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      author: req.user._id,
      resource: req.body.resource,
      content: req.body.content,
      parents: req.body.parents,
    });
    const createdComment = await comment.save();

    if (createdComment) {
      res.status(200).send(createdComment);
    } else {
      res
        .status(404)
        .send({ message: 'Some error occurred while creating comment.' });
    }
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while creating comment.',
    });
  }
};

export const editComment = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const toEdit = await Comment.findOne({ _id: commentId });
    if (toEdit.author != req.user._id) {
      res.status(401).send({
        message: 'You are not authorized to edit this comment.',
      });
    }
    const editedComment = await Comment.updateOne(
      {
        _id: commentId,
      },
      {
        content: req.body.content,
      }
    );

    if (editedComment.nModified > 0) {
      res.status(200).send(editedComment);
    } else if (editedComment.n == 0) {
      return res
        .status(404)
        .send({ message: `No comment with ID: ${commentId}` });
    }
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while editing comment.',
    });
  }
};

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const toDelete = await Comment.findOne({ _id: commentId });
    const rootDepth = toDelete.parents.length;

    const query = {};
    query['parents'] = commentId;
    query[`parents.${rootDepth + 1}`] = { $exists: false };

    const comments = await Comment.find(query);
    // If the comment has replies
    if (comments.length > 1) {
      const erasedComment = await Comment.updateOne(
        {
          _id: commentId,
        },
        {
          content: '[deleted]',
        }
      );
      if (erasedComment.nModified > 0) {
        res.status(200).send(erasedComment);
        return;
      }
    }
    // If the comment is a "leaf" comment
    else {
      const deletedComment = await Comment.deleteOne({
        _id: commentId,
      });
      if (deletedComment.deletedCount > 0) {
        res.status(200).send(deletedComment);
        return;
      }
    }
    // If the function has not returned then comment not found
    return res
      .status(404)
      .send({ message: `No comment with ID: ${commentId}` });
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while deleting comment.',
    });
  }
};

export const upvoteComment = async (req, res, next) => {
  const { commentId } = req.params;
  if (!req.user) {
    res.status(401).send({
      message: 'You are not authorized to upvote this comment.',
    });
  }
  try {
    const upvotedComment = await User.updateOne(
      {
        _id: req.user._id,
        upvotedComments: { $ne: commentId },
      },
      {
        $addToSet: { upvotedComments: commentId },
      }
    );

    if (upvotedComment.nModified > 0) {
      await Comment.updateOne({ _id: commentId }, { $inc: { upvoteCount: 1 } });
    } else if (upvotedComment.n == 0) {
      return res
        .status(404)
        .send({ message: `No resource with ID: ${commentId}` });
    }

    res.status(201).send(upvotedComment);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while upvoting comment.',
    });
  }
};

export const unupvoteComment = async (req, res, next) => {
  const { commentId } = req.params;
  if (!req.user) {
    res.status(401).send({
      message: 'You are not authorized to un-upvote this comment.',
    });
  }
  try {
    const unupvotedComment = await User.updateOne(
      {
        _id: req.user._id,
        upvotedComments: { $eq: commentId },
      },
      {
        $pull: { upvotedComments: commentId },
      }
    );

    if (unupvotedComment.nModified > 0) {
      await Comment.updateOne(
        { _id: commentId },
        { $inc: { upvoteCount: -1 } }
      );
    } else if (unupvotedComment.n == 0) {
      return res
        .status(404)
        .send({ message: `No resource with ID: ${commentId}` });
    }

    res.status(201).send(unupvotedComment);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while un-upvoting comment.',
    });
  }
};

export default router;
