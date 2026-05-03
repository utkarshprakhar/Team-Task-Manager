import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: ['planning', 'in-progress', 'review', 'completed'],
      default: 'planning',
    },
    deadline: {
      type: Date,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

// Index for faster queries
projectSchema.index({ owner: 1 });
projectSchema.index({ members: 1 });

export default mongoose.model('Project', projectSchema);
