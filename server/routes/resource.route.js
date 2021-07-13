import express from 'express';
import { getResources, getResourceByRID, saveResource } from '../controllers/resource.controller.js';

const router = express.Router();

router.get('/resources', getResources);
router.get('/resource/:resourceId', getResourceByRID);
router.patch('/:resourceId', saveResource);

export default router;
