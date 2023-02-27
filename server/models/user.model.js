import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    screenName: String,
    email: {
      type: String,
      required: true,
    },
    affiliation: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // TODO: Set permissions for each user
    role: {
      type: String,
      enum: ['ADMIN', 'EDUCATOR', 'STUDENT', 'GUEST'],
      default: 'GUEST',
    },
    isFamousPeople: {
      type: Boolean,
      default: false,
    },
    passwordHash: String,
    savedResources: [{
      type: mongoose.Types.ObjectId,
      ref: 'Resource',
    }],
    upvotedResources: [{
      type: mongoose.Types.ObjectId,
      ref: 'Resource',
    }],
    favouriteResources: [{
      type: mongoose.Types.ObjectId,
      ref: 'Resource',
    }],
    resourceScore: { type: Number, default: 0 },
    upvotedComments: [{
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
    }],
    commentScore: { type: Number, default: 0 },
  },
  { collection: 'users', timestamps: true }
);

UserSchema.pre('save', function (next) {
  if (!this.screenName) {
    this.screenName = this.get('firstName') + ' ' + this.get('lastName');
  }
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;
