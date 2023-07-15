import express from 'express';
import { UserRoutes } from '../module/user/user.route';
import { AuthRoutes } from '../module/auth/auth.route';
import { bookRoutes } from '../module/books/books.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/book',
    route: bookRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
