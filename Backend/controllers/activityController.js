import ActivityLog from '../models/ActivityLog.js';

// GET /api/activity
export const getActivity = async (req, res, next) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [logs, total] = await Promise.all([
      ActivityLog.find()
        .populate('user', 'name email avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      ActivityLog.countDocuments(),
    ]);

    res.json({
      logs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};
