import { IBook } from './books.interface';
import { Books } from './book.model';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';

const createBook = async (bookData: IBook) => {
  const result = await Books.create(bookData);
  return result;
};
const getAllBook = async () => {
  const result = await Books.find({});
  return result;
};
const getSingleBook = async (id: string) => {
  const result = await Books.findById({ _id: id });
  return result;
};
const updateBook = async (id: string, payload: IBook) => {
  const result = await Books.findByIdAndUpdate({ _id: id }, payload);
  return result;
};
const deleteBook = async (id: string) => {
  const result = await Books.findByIdAndDelete({ _id: id });
  return result;
};

const addReviews = async (id: string, payload: IBook) => {
  const review = payload.reviews;
  const result = await Books.updateOne(
    { _id: id },
    { $push: { reviews: review } },
  );

  if (result.modifiedCount != 1) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Books not found or Reviews not added',
    );
  }
  return result;
};
const getReviews = async (id: any) => {
  const result = await Books.findById({ _id: id }, { _id: 0, reviews: 1 });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reviews not found');
  }
  return result.reviews;
};

export const BookService = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
  addReviews,
  getReviews,
};
