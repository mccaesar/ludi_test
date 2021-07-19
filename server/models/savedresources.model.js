import mongoose from 'mongoose';

const savedResourceSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    resourceIds: {
      type: Array,
      required: true,
    },
  },
  { collection: 'savedresources' }
);

const SavedResource = mongoose.model('SavedResource', savedResourceSchema);

export default SavedResource;
