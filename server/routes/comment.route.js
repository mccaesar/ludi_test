import express from 'express';
import passport from 'passport';
import {
  getComments,
  getCommentChain,
  getCommentById,
  getCommentsByResourceId,
  getCommentsByUserId,
  createComment,
  editComment,
  deleteComment,
  upvoteComment,
  unupvoteComment,
} from '../controllers/comment.controller.js';

const router = express.Router();

router.get('/comments', getComments);
router.get('/comments/:depthLimit', getComments);
router.get('/comment/:commentId', getCommentById);
router.get('/comment/thread/:commentId', getCommentChain);
router.get('/comment/thread/:commentId/:depthLimit', getCommentChain);
router.get('/resource/:resourceId/comments', getCommentsByResourceId);
router.get('/resource/:resourceId/comments/:depthLimit', getCommentsByResourceId);
router.get('/user/:userId/comments', getCommentsByUserId);

router.post(
  '/comment/create',
  passport.authenticate('jwt', { session: false }),
  createComment
);
router.put(
  '/comment/:commentId/edit',
  passport.authenticate('jwt', { session: false }),
  editComment
);
router.delete(
  '/comment/:commentId/delete',
  passport.authenticate('jwt', { session: false }),
  deleteComment
);

router.put(
  '/comment/:commentId/upvote',
  passport.authenticate('jwt', { session: false }),
  upvoteComment
);
router.put(
  '/comment/:commentId/unupvote',
  passport.authenticate('jwt', { session: false }),
  unupvoteComment
);

export default router;
