import mongoose from 'mongoose';

const resourceSchema = mongoose.Schema({
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
  cons: String,
});

// resourceSchema.method('toJSON', () => {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
