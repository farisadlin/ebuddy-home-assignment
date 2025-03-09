import { Router } from "express";
import { UserController } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const userController = new UserController();

/**
 * @route   POST /api/users/login
 * @desc    Login with existing user credentials
 * @access  Public
 */
router.post("/users/login", userController.login.bind(userController));

/**
 * @route   POST /api/users/create
 * @desc    Create a new user
 * @access  Public
 */
router.post("/users/create", userController.createUser.bind(userController));

/**
 * @route   PUT /api/update-user-data/:id
 * @desc    Update user data
 * @access  Private
 */
router.put(
  "/update-user-data/:id",
  authMiddleware,
  userController.updateUserData.bind(userController)
);

/**
 * @route   GET /api/profile
 * @desc    Get the authenticated user's profile
 * @access  Private
 */
router.get(
  "/fetch-user-data",
  authMiddleware,
  userController.getUserProfile.bind(userController)
);

export default router;
