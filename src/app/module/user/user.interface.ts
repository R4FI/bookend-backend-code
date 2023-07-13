import { Model } from "mongoose";

export type IUser = {
  name:string,
  password:string,
  email:string
  };
  export type USerModel = Model<IUser, Record<string, unknown>>;