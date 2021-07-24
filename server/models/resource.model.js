import mongoose from 'mongoose';

const resourceSchema = mongoose.Schema(
  {
    resourceId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    longDescription: String,
    url: {
      type: String,
      required: true,
    },
    author: String,
    category: String,
    tags: String,
    isOpenSource: Boolean,
    dateAdded: {
      type: Date,
      required: true,
    },
    saveCount: {
      type: Number,
      required: true,
    },
  },
  { collection: 'resources' }
);

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
