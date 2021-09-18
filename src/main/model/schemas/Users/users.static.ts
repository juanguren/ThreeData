import { IUser, UserClass } from './users.type';
import UserSchema from './users.model';

const getUser = async (username: string): Promise<any> => {
  try {
    return await UserSchema.findOne({ username: username });
  } catch (error) {
    return error;
  }
};

const deleteUser = async (username: string): Promise<any> => {
  try {
    const foundUser = await UserSchema.findOneAndDelete({ username: username });
    if (foundUser) return foundUser;
  } catch (error) {
    return error;
  }
};

const updateUserSearchCount = async (username: string): Promise<any | null> => {
  try {
    let updatedCount = 1;
    const foundUser = await UserSchema.findOne({ username: username });
    if (foundUser) updatedCount += foundUser.entryCount!;

    return await UserSchema.findOneAndUpdate(
      { username: username },
      { entryCount: updatedCount }
    );
  } catch (error) {
    return error;
  }
};

/**
 * The class below served as a OOP learning opportunity. I realize it may not be very efficient to combine both
 * functional and object-oriented programming in a single file.
 */

export class User implements UserClass {
  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public username: string,
    public entryCount?: number
  ) {}

  private getUser = async (username: string): Promise<any> => {
    try {
      return await UserSchema.findOne({ username: username });
    } catch (error) {
      return error;
    }
  };

  save = async (): Promise<any> => {
    const userObject = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      username: this.username,
    };

    try {
      const userExists: Promise<IUser> = await this.getUser(this.username);
      if (userExists) return userExists;
      return await UserSchema.create(userObject);
    } catch (error) {
      return error;
    }
  };
}

export default {
  getUser,
  deleteUser,
  updateUserSearchCount,
};
