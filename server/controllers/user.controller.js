import express from 'express';
import db from '../models/index.js';

const router = express.Router();
const { User } = db;

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).send(`No user with id: ${userId}`);
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send({
      message:
        err.message ||
        `Some error occurred while retrieving user with id: ${userId}.`,
    });
  }
};

export default router;
