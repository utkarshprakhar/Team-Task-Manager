import { Router } from 'express';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

export default router;
