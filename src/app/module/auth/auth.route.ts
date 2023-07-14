import express from 'express';
import { AuthValidation } from './auth.validation';
import { authController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  authController.loginUser,
);
router.post('/refresh-token', authController.loginUser);

export const AuthRoutes = router;
