import User from '../models/User.js';

// GET /api/users - Admin: list all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-__v').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id/role - Admin: update user role
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['admin', 'member'].includes(role)) {
      return res.status(400).json({ message: 'Role must be admin or member' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    next(error);
  }
};
