import Task from '../models/Task.js';
import Project from '../models/Project.js';
import { logActivity } from '../utils/logActivity.js';

// POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    const { title, description, project, assignee, status, priority, deadline } = req.body;

    if (!title || !project) {
      return res.status(400).json({ message: 'Task title and project are required' });
    }

    // Verify project exists
    const projectDoc = await Project.findById(project);
    if (!projectDoc) return res.status(404).json({ message: 'Project not found' });

    const task = await Task.create({
      title,
      description,
      project,
      assignee,
      status,
      priority,
      deadline,
    });

    await logActivity(req.user._id, 'created_task', 'task', task._id, title, `in project "${projectDoc.title}"`);

    const populated = await Task.findById(task._id)
      .populate('assignee', 'name email avatar')
      .populate('project', 'title');

    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks
export const getTasks = async (req, res, next) => {
  try {
    const { project, status, assignee, sort, limit } = req.query;
    const filter = {};

    if (project) filter.project = project;
    if (status) filter.status = status;
    if (assignee) filter.assignee = assignee;

    let query = Task.find(filter)
      .populate('assignee', 'name email avatar')
      .populate('project', 'title');

    // Sort
    if (sort === 'deadline') {
      query = query.sort({ deadline: 1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    if (limit) query = query.limit(parseInt(limit));

    const tasks = await query;
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/:id
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignee', 'name email avatar')
      .populate('project', 'title');

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const oldTask = await Task.findById(req.params.id);
    if (!oldTask) return res.status(404).json({ message: 'Task not found' });

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('assignee', 'name email avatar')
      .populate('project', 'title');

    // Log specific changes
    if (req.body.status && req.body.status !== oldTask.status) {
      const action = req.body.status === 'done' ? 'completed_task' : 'updated_task_status';
      await logActivity(req.user._id, action, 'task', task._id, task.title, `Status: ${oldTask.status} → ${req.body.status}`);
    } else if (req.body.assignee && req.body.assignee !== String(oldTask.assignee)) {
      await logActivity(req.user._id, 'assigned_task', 'task', task._id, task.title);
    } else {
      await logActivity(req.user._id, 'updated_task', 'task', task._id, task.title);
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await logActivity(req.user._id, 'deleted_task', 'task', task._id, task.title);
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};
