import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  PublicationDate: string;
  reviews: string[];
  img: string;
};
export type BookModel = Model<IBook, Record<string, unknown>>;
