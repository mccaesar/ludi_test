/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';

import db from '../models/index.js';

const Resource = db.resources;

const router = express.Router();

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).send(resources);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while retrieving resources.',
    });
  }
};

export const saveResource = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  // const resource = await Resource.findById(id);
  // const savedResource = await Resource.findByIdAndUpdate(id, { isSaved: true });
  // res.json(savedResource);
};

export default router;
