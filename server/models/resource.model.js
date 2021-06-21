import mongoose from 'mongoose';

const resourceSchema = mongoose.Schema({
  resourceId: Number,
  title: String,
  description: String,
  longDescription: String,
  url: String,
  author: String,
  category: String,
  tags: String,
  isOpenSource: Boolean,
  dateAdded: String,
});

// resourceSchema.method('toJSON', () => {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
