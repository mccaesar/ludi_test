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
    additionalDescription: String,
    url: {
      type: String,
      required: true,
    },
    author: String,
    category: String,
    tags: [{ type: String }],
    isOpenSource: Boolean,
    dateSubmitted: {
      type: Date,
      default: Date.now,
    },
    submittedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
    saveCount: {
      type: Number,
      default: 0,
    },
    upvoteCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { collection: 'resources' }
);

const Resource = mongoose.model('Resource', ResourceSchema);

export default Resource;
