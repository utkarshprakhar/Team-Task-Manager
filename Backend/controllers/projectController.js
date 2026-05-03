import Project from '../models/Project.js';
import Task from '../models/Task.js';
import { logActivity } from '../utils/logActivity.js';

// POST /api/projects
export const createProject = async (req, res, next) => {
  try {
    const { title, description, status, deadline, members } = req.body;

    if (!title) return res.status(400).json({ message: 'Project title is required' });

    const project = await Project.create({
      title,
      description,
      status,
      deadline,
      owner: req.user._id,
      members: members || [req.user._id],
    });

    await logActivity(req.user._id, 'created_project', 'project', project._id, title);

    const populated = await Project.findById(project._id)
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar');

    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

// GET /api/projects
export const getProjects = async (req, res, next) => {
  try {
    let filter = {};

    // Admin sees all, members see only their projects
    if (req.user.role !== 'admin') {
      filter = {
        $or: [{ owner: req.user._id }, { members: req.user._id }],
      };
    }

    const projects = await Project.find(filter)
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar')
      .sort({ createdAt: -1 });

    // Compute progress for each project based on task completion
    const projectsWithProgress = await Promise.all(
      projects.map(async (project) => {
        const totalTasks = await Task.countDocuments({ project: project._id });
        const doneTasks = await Task.countDocuments({ project: project._id, status: 'done' });
        const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

        return { ...project.toObject(), progress, taskCount: totalTasks, doneCount: doneTasks };
      })
    );

    res.json(projectsWithProgress);
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id
export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar');

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const totalTasks = await Task.countDocuments({ project: project._id });
    const doneTasks = await Task.countDocuments({ project: project._id, status: 'done' });
    const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

    res.json({ ...project.toObject(), progress, taskCount: totalTasks, doneCount: doneTasks });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar');

    if (!project) return res.status(404).json({ message: 'Project not found' });

    await logActivity(req.user._id, 'updated_project', 'project', project._id, project.title);

    res.json(project);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await logActivity(req.user._id, 'deleted_project', 'project', project._id, project.title);

    // Delete all tasks in this project
    await Task.deleteMany({ project: project._id });
    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: 'Project and related tasks deleted' });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id/members
export const updateMembers = async (req, res, next) => {
  try {
    const { members } = req.body;
    if (!Array.isArray(members)) {
      return res.status(400).json({ message: 'Members must be an array of user IDs' });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { members },
      { new: true, runValidators: true }
    )
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar');

    if (!project) return res.status(404).json({ message: 'Project not found' });

    await logActivity(req.user._id, 'updated_members', 'project', project._id, project.title, `Team updated to ${members.length} members`);

    res.json(project);
  } catch (error) {
    next(error);
  }
};
