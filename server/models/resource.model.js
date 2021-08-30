import mongoose from 'mongoose';

const ResourceSchema = mongoose.Schema(
  {
    index: {
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
    tags: [{ type: String }],
    isOpenSource: Boolean,
    dateAdded: {
      type: Date,
      default: Date.now,
    },
    saveCount: {
      type: Number,
      default: 0,
      required: true,
    },
    ratingCount: {
      type: Number,
      default: 0,
      required: true,
    },
    ratingAverage: {
      type: Number,
      default: 3,
      required: true,
    },
  },
  { collection: 'resources' }
);

const Resource = mongoose.model('Resource', ResourceSchema);

export default Resource;
