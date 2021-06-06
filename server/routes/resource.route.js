/* eslint-disable import/extensions */
import express from 'express';
import {
  getResources,
  saveResource,
} from '../controllers/resource.controller.js';

const router = express.Router();

router.get('/', getResources);
router.patch('/:id/saveResource', saveResource);

export default router;
