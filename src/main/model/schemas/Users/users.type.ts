import { Document } from "mongoose";

export interface IUser extends Document {
  full_name: string;
  email: string;
  username: string;
  entryCount?: number;
}
