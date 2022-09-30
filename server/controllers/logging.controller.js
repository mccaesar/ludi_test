import express from 'express';
import db from '../models/index.js';
import logger from '../utils/logger.js';

const router = express.Router();
const { Comment, Resource, User } = db;

const urlLogContent = (req) => {
    const logContent = {
      metadata: {
        author: req.body.author,
        url: req.body.url,
        ip: req.body.ip,
      }
    }
    return logContent
};


export const loggingUrlClicked = async (req, res, next) => {
  const logContent = urlLogContent(req);

  try {
    logger.info('successfully create comment', { ...logContent, action: 'user clicking an Url' })
    res.status(200).send("successfully logging");
  } catch (err) {
    res.status(404).send({
      message:
        err.message ||
        `Some error occurred while logging.`,
    });
  }
};

const searchLogContent = (req) => {
    const logContent = {
      metadata: {
        author: req.user._id,
        searchContent: req.body.content,
        ip: req.body.ip,
      }
    }
    return logContent
};

export const loggingSearch = async (req, res, next) => {
    const logContent = searchLogContent(req);
  
    try {
      logger.info('successfully create comment', { ...logContent, action: 'User do a searching' })
      res.status(200).send("successfully logging");
    } catch (err) {
      res.status(404).send({
        message:
          err.message ||
          `Some error occurred while logging.`,
      });
    }
  };

export default router;
