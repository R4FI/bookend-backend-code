/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './books.interface';

const bookSchema = new Schema<IBook, Record<string, never>>(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    genre: { type: String, required: true },
    PublicationDate: {
      type: String,
      required: true,
    },
    reviews: {
      type: [String],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Books = model<IBook, BookModel>('Books', bookSchema);
