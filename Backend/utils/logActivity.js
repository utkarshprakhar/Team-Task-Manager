import ActivityLog from '../models/ActivityLog.js';

/**
 * Log an activity to the database.
 * @param {string} userId - The user performing the action
 * @param {string} action - The action type (e.g. 'created_task')
 * @param {string} targetType - 'task' | 'project' | 'user'
 * @param {string} targetId - The ObjectId of the target
 * @param {string} targetTitle - Human-readable title of the target
 * @param {string} details - Additional details
 */
export const logActivity = async (userId, action, targetType, targetId, targetTitle = '', details = '') => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      targetType,
      targetId,
      targetTitle,
      details,
    });
  } catch (err) {
    console.error('Failed to log activity:', err.message);
    // Don't throw — activity logging should never block the main operation
  }
};
