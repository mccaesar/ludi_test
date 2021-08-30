import mongoose from 'mongoose';

const ReviewSchema = mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      index: true,
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'resources',
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    upvotes: [
      {
        upvotedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
