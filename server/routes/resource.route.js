import express from 'express';
import { getResources, getResourceByRID, getSavedResourceIds, saveResource, unsaveResource } from '../controllers/resource.controller.js';

const router = express.Router();

router.get('/resources', getResources);
// router.get('/resource/:resourceId', getResourceByRID);
router.get('/resource/:resourceId/:userId', getResourceByRID);
router.get('/saved/:userId', getSavedResourceIds);
router.patch('/resource/:resourceId/save', saveResource);
router.patch('/resource/:resourceId/unsave', unsaveResource);

export default router;
