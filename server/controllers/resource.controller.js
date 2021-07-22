import express from 'express';
import db from '../models/index.js';

const router = express.Router();
const { Resource, SavedResource, User } = db;

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

// export const getResourceByRID = async (req, res) => {
//   try {
//     const resource = await Resource.findOne({
//       resourceId: req.params.resourceId,
//     });
//     res.status(200).send(resource);
//   } catch (err) {
//     res.status(404).send({
//       message:
//         err.message ||
//         `Some error occurred while retrieving resource with id: ${resourceId}.`,
//     });
//   }
// };

export const getResourceByRID = async (req, res) => {
  const { resourceId, userId } = req.params;
  // const { userId } = req.data;
  try {
    const resource = await Resource.findOne({
      resourceId: resourceId,
    });
    const isSaved = !!(await SavedResource.findOne({
      $and: [{ userId: userId }, { resourceIds: { $in: [resourceId] } }],
    }));
    res.status(200).json({ resource: resource, isSaved: isSaved });
  } catch (err) {
    res.status(404).send({
      message:
        err.message ||
        `Some error occurred while retrieving resource with id: ${resourceId}.`,
    });
  }
};

export const getSavedResourceIds = async (req, res) => {
  const { userId } = req.params;
  try {
    const savedResourceIds = await SavedResource.findOne({
      userId: userId,
    });
    res.status(200).send(savedResourceIds);
  } catch (err) {
    res.status(404).send({
      message:
        err.message || `Some error occurred while retrieving saved resources.`,
    });
  }
};

export const saveResource = async (req, res) => {
  const { resourceId } = req.params;
  const { userId } = req.body;

  const user = User.findOne({ _id: userId });
  if (!user) {
    return res.status(401).send(`No user with id: ${userId}`);
  }
  const resource = Resource.findOne({ resourceId: resourceId });
  if (!resource) {
    return res.status(401).send(`No resource with id: ${resourceId}`);
  }

  const savedResource = await SavedResource.updateOne(
    { userId: userId },
    {
      $set: {
        userId: userId,
      },
      $addToSet: {
        resourceIds: resourceId,
      },
    },
    { upsert: true }
  );
  // res.status(200).json(savedResource);
  res.status(200).send(userId);
};

export const unsaveResource = async (req, res) => {
  const { resourceId } = req.params;
  const { userId } = req.body;

  const user = User.findOne({ _id: userId });
  if (!user) {
    return res.status(401).send(`No user with id: ${userId}`);
  }
  const resource = Resource.findOne({ resourceId: resourceId });
  if (!resource) {
    return res.status(401).send(`No resource with id: ${resourceId}`);
  }

  const savedResource = await SavedResource.updateOne(
    { userId: userId },
    {
      $pull: { resourceIds: { $in: [resourceId] } },
    }
  );
  res.status(200).json(savedResource);
};

export default router;
