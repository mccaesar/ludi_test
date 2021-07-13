import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 1,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
      min: 1,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1023,
    },
    dateJoined: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

export default User;
