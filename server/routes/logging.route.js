import express from 'express';
import {
    loggingUrlClicked,
    loggingSearch,
} from '../controllers/logging.controller.js';

const router = express.Router();

router.put(
  '/logging/loggingUrl',
  loggingUrlClicked
);
router.put(
    '/logging/loggingSearch',
    loggingSearch
  );

export default router;
