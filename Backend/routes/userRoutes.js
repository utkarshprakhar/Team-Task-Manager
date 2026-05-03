import { Router } from 'express';
import { getUsers, getUser, updateUserRole } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect); // All user routes are protected

router.get('/', authorize('admin'), getUsers);
router.get('/:id', getUser);
router.put('/:id/role', authorize('admin'), updateUserRole);

export default router;
