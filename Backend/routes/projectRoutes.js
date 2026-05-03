import { Router } from 'express';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  updateMembers,
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect); // All project routes are protected

router.route('/').get(getProjects).post(createProject);

router.route('/:id').get(getProject).put(updateProject).delete(authorize('admin'), deleteProject);

router.put('/:id/members', updateMembers);

export default router;
