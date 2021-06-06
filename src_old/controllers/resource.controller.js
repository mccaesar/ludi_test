import { db } from '../models';

const Resource = db.resources;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Resource
  const resource = new Resource({
    title: req.body.title,
    description: req.body.description,
    longDescription: req.body.longDescription,
    website: req.body.website,
    downloadorSignUp: req.body.downloadorSignUp,
    author: req.body.author,
    categorization: req.body.categorization,
    tags: req.body.tags,
    cost: req.body.cost,
    openSource: req.body.openSource,
    dateAdded: req.body.dateAdded,
    potentialUseCases: req.body.potentialUseCases,
    strength: req.body.strength,
    cons: req.body.cons,
  });

  // Save Resource in the database
  resource
    .save(resource)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Resource.',
      });
    });
};

exports.findAll = (req, res) => {
  const { title } = req.query;
  const condition = title
    ? { title: { $regex: new RegExp(title), $options: 'i' } }
    : {};

  Resource.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving resources.',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;

  Resource.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: `Not found Resource with id ${id}` });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error retrieving Resource with id=${id}` });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Data to update can not be empty!',
    });
    return;
  }

  const { id } = req.params;

  Resource.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Resource with id=${id}. Maybe Resource was not found!`,
        });
      } else res.send({ message: 'Resource was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Resource with id=${id}`,
      });
    });
};

exports.remove = (req, res) => {
  const { id } = req.params;

  Resource.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Resource with id=${id}. Maybe Resource was not found!`,
        });
      } else {
        res.send({
          message: 'Resource was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Resource with id=${id}`,
      });
    });
};

exports.removeAll = (req, res) => {
  Resource.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Resources were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all resources.',
      });
    });
};
