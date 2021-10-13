import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    resource: {
      type: mongoose.Types.ObjectId,
      ref: 'resources',
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    upvoteCount: {
      type: Number,
      default: 0,
    },
    // Parents array include all parent comments AND the current comment itself
    // parents.length == depth of comment
    // (e.g. for root comment, parents.length == depth == 1)
    parents: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

CommentSchema.pre('save', function (next) {
  this.parents.push(this._id);
  next();
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
