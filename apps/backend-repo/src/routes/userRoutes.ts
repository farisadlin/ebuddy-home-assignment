import { Router } from 'express';
import { UserController } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private
 */
router.get('/', authMiddleware, userController.fetchUserData.bind(userController));

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private
 */
router.get('/:id', authMiddleware, userController.fetchUserData.bind(userController));

/**
 * @route   POST /api/users/login
 * @desc    Login with existing user credentials
 * @access  Public
 */
router.post('/login', userController.login.bind(userController));

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public
 */
router.post('/', userController.createUser.bind(userController));

/**
 * @route   PUT /api/users/:id
 * @desc    Update user data
 * @access  Private
 */
router.put('/:id', authMiddleware, userController.updateUserData.bind(userController));

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user
 * @access  Private
 */
router.delete('/:id', authMiddleware, userController.deleteUser.bind(userController));

export default router;
