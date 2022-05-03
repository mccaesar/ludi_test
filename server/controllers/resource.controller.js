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

export const getResourceById = async (req, res, next) => {
  const { resourceId } = req.params;
  try {
    const resource = await Resource.findOne({ _id: resourceId });
    res.status(200).send(resource);
  } catch (err) {
    res.status(404).send({
      message: err.message || `Some error occurred while retrieving resource with ID: ${resourceId}.`,
    });
  }
};

export const createResource = async (req, res, next) => {
  try {
    const newIndex =
      Number((await Resource.find().sort({ index: -1 }).limit(1)).pop().index) + 1;
    const resource = new Resource({
      index: newIndex,
      title: req.body.title,
      description: req.body.description,
      additionalDescription: req.body.additionalDescription,
      url: req.body.url,
      author: req.body.author,
      category: req.body.category,
      tags: req.body.tags,
      isOpenSource: req.body.isOpenSource,
      submittedBy: req.user._id,
    });
    const createdResource = await resource.save();

    if (createdResource) {
      res.status(200).send(createdResource);
    } else {
      res
        .status(404)
        .send({ message: 'Some error occurred while creating resource.' });
    }
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while creating resource.',
    });
  }
};

export const editResource = async (req, res, next) => {
  const { resourceId } = req.params;
  try {
    const toEdit = await Resource.findOne({ _id: resourceId });
    const currUser = await User.findOne({ _id: String(req.user._id) });
    if (toEdit.submittedBy != String(req.user._id) || currUser.role != 'GUEST') {
      res.status(404).send({
        message: 'You are not authorized to edit this resource.',
      }); 
      return;
    }
    const editedResource = await Resource.updateOne(
      {
        _id: resourceId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        additionalDescription: req.body.additionalDescription,
        url: req.body.url,
        author: req.body.author,
        category: req.body.category,
        tags: req.body.tags,
        isOpenSource: req.body.isOpenSource,
        submittedBy: req.user._id,
      }
    );

    if (editedResource.nModified > 0) {
      res.status(200).send(editedResource);
    } else if (editedResource.n == 0) {
      return res
        .status(404)
        .send({ message: `No resource with ID: ${resourceId}` });
    }
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while editing resource.',
    });
  }
};

export const deleteResource = async (req, res, next) => {
  const { resourceId } = req.params;
  try {
    const deletedResource = await Resource.deleteOne({
      _id: resourceId,
    });
    if (deletedResource.deletedCount > 0) {
      res.status(200).send(deletedResource);
      return;
    }

    // If the function has not returned then resource not found
    return res
      .status(404)
      .send({ message: `No resource with ID: ${resourceId}` });
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while deleting resource.',
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

export const saveResource = async (req, res, next) => {
  const { resourceId } = req.params;
  if (!req.user) {
    res.status(401).send({
      message: 'You are not authorized to save this resource.',
    });
  }
  try {
    const savedResource = await User.updateOne(
      {
        _id: req.user._id,
        savedResources: { $ne: resourceId },
      },
      {
        $addToSet: { savedResources: resourceId },
      }
    );

    if (savedResource.nModified > 0) {
      await Resource.updateOne({ _id: resourceId }, { $inc: { saveCount: 1 } });
    } else if (savedResource.n == 0) {
      return res
        .status(404)
        .send({ message: `No resource with ID: ${resourceId}` });
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
    const unsavedResource = await User.updateOne(
      {
        _id: req.user._id,
        savedResources: { $eq: resourceId },
      },
      {
        $pull: { savedResources: resourceId },
      }
    );

    if (unsavedResource.nModified > 0) {
      await Resource.updateOne(
        { _id: resourceId },
        { $inc: { saveCount: -1 } }
      );
    } else if (unsavedResource.n == 0) {
      return res
        .status(404)
        .send({ message: `No resource with ID: ${resourceId}` });
    }

    res.status(201).send(unsavedResource);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while unsaving resource.',
    });
  }
};

export const upvoteResource = async (req, res, next) => {
  const { resourceId } = req.params;
  if (!req.user) {
    res.status(401).send({
      message: 'You are not authorized to upvote this resource.',
    });
  }
  try {
    const upvotedResource = await User.updateOne(
      {
        _id: req.user._id,
        upvotedResources: { $ne: resourceId },
      },
      {
        $addToSet: { upvotedResources: resourceId },
      }
    );

    if (upvotedResource.nModified > 0) {
      await Resource.updateOne(
        { _id: resourceId },
        { $inc: { upvoteCount: 1 } }
      );
    } else if (upvotedResource.n == 0) {
      return res
        .status(404)
        .send({ message: `No resource with ID: ${resourceId}` });
    }

    res.status(201).send(upvotedResource);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while liking resource.',
    });
  }
};

export const unupvoteResource = async (req, res, next) => {
  const { resourceId } = req.params;
  if (!req.user) {
    res.status(401).send({
      message: 'You are not authorized to un-upvote this resource.',
    });
  }
  try {
    const unupvotedResource = await User.updateOne(
      {
        _id: req.user._id,
        upvotedResources: { $eq: resourceId },
      },
      {
        $pull: { upvotedResources: resourceId },
      }
    );

    if (unupvotedResource.nModified > 0) {
      await Resource.updateOne(
        { _id: resourceId },
        { $inc: { upvoteCount: -1 } }
      );
    } else if (unupvotedResource.n == 0) {
      return res
        .status(404)
        .send({ message: `No resource with ID: ${resourceId}` });
    }

    res.status(201).send(unupvotedResource);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while un-upvoting resource.',
    });
  }
};

export default router;
