import express from 'express';
import mongoose from 'mongoose';
import db from '../models/index.js';

const router = express.Router();
const { Resource } = db;

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

export const getResourceByRID = async (req, res) => {
  try {
    const resource = await Resource.findOne({ resourceId: req.params.resourceId });
    res.status(200).send(resource);
  } catch (err) {
    res.status(404).send({
      message:
        err.message ||
        `Some error occurred while retrieving resource with id: ${resourceId}.`,
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
