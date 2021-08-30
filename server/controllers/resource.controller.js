import express from 'express';
import db from '../models/index.js';

const router = express.Router();
const { Resource, User } = db;

export const getResources = async (req, res, next) => {
  try {
    const resources = await Resource.find();
    res.status(200).send(resources);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while retrieving resources.',
    });
  }
};

export const getTags = async (req, res, next) => {
  try {
    const tags = await Resource.find().distinct('tags', {
      tags: { $nin: ['', null] },
    });
    res.status(200).send(tags);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while retrieving tags.',
    });
  }
};

export const getSavedResourceIds = async (req, res, next) => {
  const { userId } = req.params;
  if (!req.user || req.user !== userId) {
    res.status(401).send({
      message: 'You are not authorized to retrieve saved resources.',
    });
  }
  try {
    const savedResourceIds = await User.findOne({
      _id: userId,
    }).select({
      savedResources: 1,
    });
    res.status(200).send(savedResourceIds);
  } catch (err) {
    res.status(404).send({
      message:
        err.message || 'Some error occurred while retrieving saved resources.',
    });
  }
};

export const saveResource = async (req, res, next) => {
  const { resourceId } = req.params;
  if (!req.user) {
    res.status(401).send({
      message: 'You are not authorized to save this resource.',
    });
  }
  try {
    const resource = await Resource.findOne({ _id: resourceId });
    if (!resource) {
      return res.status(404).send(`No resource with id: ${resourceId}`);
    }

    const savedResource = await User.updateOne(
      {
        _id: req.user._id,
        savedResources: {
          $not: {
            $elemMatch: {
              resourceId: resourceId,
            },
          },
        },
      },
      {
        $push: { savedResources: { resourceId: resourceId } },
      }
    );

    if (savedResource) {
      await Resource.updateOne({ _id: resourceId }, { $inc: { saveCount: 1 } });
    }

    res.status(201).send(savedResource);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while saving resource.',
    });
  }
};

export const unsaveResource = async (req, res, next) => {
  const { resourceId } = req.params;
  if (!req.user) {
    res.status(401).send({
      message: 'You are not authorized to unsave this resource.',
    });
  }
  try {
    const resource = await Resource.findOne({ _id: resourceId });
    if (!resource) {
      return res.status(404).send(`No resource with id: ${resourceId}`);
    }

    const unsavedResource = await User.updateOne(
      {
        _id: req.user._id,
        savedResources: {
          $elemMatch: {
            resourceId: resourceId,
          },
        },
      },
      {
        $pull: { savedResources: { resourceId: resourceId } },
      }
    );

    if (unsavedResource) {
      await Resource.updateOne(
        { _id: resourceId },
        { $inc: { saveCount: -1 } }
      );
    }

    res.status(201).send(unsavedResource);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while unsaving resource.',
    });
  }
};

export default router;
