module.exports = (app) => {
  const resources = require("../controllers/resource.controller.js");

  var router = require("express").Router();

  // Create a new Resource
  router.post("/", resources.create);

  // Retrieve all Resources
  router.get("/", resources.findAll);

  // Retrieve a single Resource with id
  router.get("/:id", resources.findOne);

  // Update a Resource with id
  router.put("/:id", resources.update);

  // Delete a Resource with id
  router.delete("/:id", resources.delete);

  // Create a new Resource
  router.delete("/", resources.deleteAll);

  app.use("/api/resources", router);
};
