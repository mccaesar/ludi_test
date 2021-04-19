module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    title: String,
    description: String,
    longDescription: String,
    website: String,
    downloadorSignUp: String,
    author: String,
    categorization: String,
    tags: String,
    cost: String,
    openSource: String,
    dateAdded: String,
    potentialUseCases: String,
    strength: String,
    cons: String
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Resource = mongoose.model("resource", schema);
  return Resource;
};
