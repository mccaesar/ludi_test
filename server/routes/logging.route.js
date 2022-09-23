import express from 'express';
import {
    loggingUrl,
} from '../controllers/logging.controller.js';

const router = express.Router();

router.put(
  '/logging/loggingUrl',
  loggingUrl
);

export default router;
