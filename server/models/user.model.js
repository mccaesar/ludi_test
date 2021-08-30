import mongoose from 'mongoose';

const SavedResourceSchema = mongoose.Schema({
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'resources',
    required: true,
  },
  dateSaved: {
    type: Date,
    default: Date.now,
  },
  _id: false,
});

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
    email: {
      type: String,
      required: true,
    },
    hash: String,
    dateJoined: {
      type: Date,
      default: Date.now,
    },
    savedResources: [SavedResourceSchema],
  },
  { collection: 'users' }
);

const User = mongoose.model('User', UserSchema);

export default User;
