import express from 'express';
import passport from 'passport';
import {
  getResources,
  getResourceById,
  getTags,
  createResource,
  editResource,
  deleteResource,
  saveResource,
  unsaveResource,
  upvoteResource,
  unupvoteResource,
} from '../controllers/resource.controller.js';

const router = express.Router();

router.get('/resources', getResources);
router.get('/resource/:resourceId', getResourceById);
router.get('/resource/tags', getTags);

router.post(
  '/resource/create',
  passport.authenticate('jwt', { session: false }),
  createResource
);
router.put(
  '/resource/:resourceId/edit',
  passport.authenticate('jwt', { session: false }),
  editResource
);
router.delete(
  '/resource/:resourceId/delete',
  passport.authenticate('jwt', { session: false }),
  deleteResource
);

router.put(
  '/resource/:resourceId/save',
  passport.authenticate('jwt', { session: false }),
  saveResource
);
router.put(
  '/resource/:resourceId/unsave',
  passport.authenticate('jwt', { session: false }),
  unsaveResource
);
router.put(
  '/resource/:resourceId/upvote',
  passport.authenticate('jwt', { session: false }),
  upvoteResource
);
router.put(
  '/resource/:resourceId/unupvote',
  passport.authenticate('jwt', { session: false }),
  unupvoteResource
);

export default router;
