import { Model } from 'mongoose';

export type IUser = {
  role: string;
  name: string;
  password: string;
  email: string;
  wishlist: string[]; // Array of book IDs for wishlist
  currentlyReading: string[]; // Array of book IDs for currently reading books
  finishedReading: string[]; // Array of book IDs for finished reading books
};

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, 'email' | 'password' | 'name'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
