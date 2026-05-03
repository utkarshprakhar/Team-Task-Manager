import Task from '../models/Task.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

// GET /api/analytics/dashboard
export const getDashboardStats = async (req, res, next) => {
  try {
    const [totalTasks, todoTasks, inProgressTasks, reviewTasks, doneTasks, totalProjects, totalUsers] =
      await Promise.all([
        Task.countDocuments(),
        Task.countDocuments({ status: 'todo' }),
        Task.countDocuments({ status: 'in-progress' }),
        Task.countDocuments({ status: 'review' }),
        Task.countDocuments({ status: 'done' }),
        Project.countDocuments(),
        User.countDocuments(),
      ]);

    // Overdue = tasks with deadline in the past and not done
    const overdueTasks = await Task.countDocuments({
      deadline: { $lt: new Date() },
      status: { $ne: 'done' },
    });

    // Tasks per user (top 5)
    const tasksPerUser = await Task.aggregate([
      { $match: { assignee: { $ne: null } } },
      { $group: { _id: '$assignee', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          name: '$user.name',
          avatar: '$user.avatar',
          count: 1,
        },
      },
    ]);

    // Tasks by priority
    const tasksByPriority = await Task.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]);

    // Projects by status
    const projectsByStatus = await Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      totalTasks,
      todoTasks,
      inProgressTasks,
      reviewTasks,
      doneTasks,
      overdueTasks,
      totalProjects,
      totalUsers,
      completionRate: totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0,
      tasksPerUser,
      tasksByPriority,
      projectsByStatus,
    });
  } catch (error) {
    next(error);
  }
};
