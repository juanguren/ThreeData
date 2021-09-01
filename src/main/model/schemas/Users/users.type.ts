import { Document } from 'mongoose';

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  entryCount?: number;
}

export interface UserClass {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  entryCount?: number;
  save(userobject: object): Promise<IUser>;
}
