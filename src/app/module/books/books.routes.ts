import express from 'express';
import { bookController } from './books.controller';

const router = express.Router();
router.post('/reviews/:id', bookController.addReviews);
router.get('/reviews/:id', bookController.getReviews);
router.get('/:id', bookController.getSingleBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
router.post('/', bookController.createBook); //only authorized user can add the book and edit
router.get('/', bookController.getAllBook);

export const bookRoutes = router;
