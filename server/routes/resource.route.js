import express from 'express';
import passport from 'passport';
import {
  getResources,
  getTags,
  saveResource,
  unsaveResource,
} from '../controllers/resource.controller.js';

const router = express.Router();

router.get('/resources', getResources);
router.get('/resource/tags', getTags);
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

export default router;
