import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      // e.g. 'created_task', 'updated_task', 'deleted_task',
      //      'created_project', 'updated_project', 'completed_task',
      //      'assigned_task', 'commented'
    },
    targetType: {
      type: String,
      enum: ['task', 'project', 'user'],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    targetTitle: {
      type: String,
      default: '',
    },
    details: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Index for chronological queries
activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ user: 1 });

export default mongoose.model('ActivityLog', activityLogSchema);
