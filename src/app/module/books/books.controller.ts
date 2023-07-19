import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwt.helper';
import catchAsync from '../../../shared/catchAsync';
import config from '../../../config';
import { User } from '../user/user.model';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { BookService } from './books.service';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import auth from '../../middleware/auth';
import { Books } from './book.model';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.createBook(bookData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully!',
    data: result,
  });
});
const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBook();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully!',
    data: result,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully!',
    data: result,
  });
});
// const updateBook = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const payload = req.body;
//   console.log('Received request to update book with ID:', id);
//   console.log('Update payload:', payload);
//   const result = await BookService.updateBook(id, payload);
//   await result?.save();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Book updated successfully!',
//     data: result,
//   });
// });
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body.data || req.body;

  // Extract the relevant fields from the payload
  const { title, author, genre, PublicationDate, img } = payload;
  // Create an object with the fields to be updated
  const updateFields = {
    title: title || undefined,
    author: author || undefined,
    genre: genre || undefined,
    PublicationDate: PublicationDate || undefined,
    img: img || undefined,
  };

  // Remove undefined fields from the update object
  const cleanUpdateFields = Object.fromEntries(
    Object.entries(updateFields).filter(([_, value]) => value !== undefined),
  );

  // Update the book in the database
  const result = await BookService.updateBook(id, cleanUpdateFields);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully!',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully!',
    data: result,
  });
});
const addReviews = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await BookService.addReviews(id, data);
  console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews added successfully!',
    data: result,
  });
});
const getReviews = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getReviews(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews get successfully!',
    data: result,
  });
});

export const bookController = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
  addReviews,
  getReviews,
};
