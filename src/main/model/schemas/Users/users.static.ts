import { IUser } from './users.type';
import UserSchema from './users.model';

/**
 * Evaluate transforming the entire static file into an object managing CRUD actions
 */

const getUser = async (username: string): Promise<any> => {
  try {
    return await UserSchema.findOne({ username: username });
  } catch (error) {
    return error;
  }
};

const deleteUser = async (username: string): Promise<any> => {
  try {
    return await UserSchema.findOneAndDelete({ username: username });
  } catch (error) {
    return error;
  }
};

const updateUserSearchCount = async (username: string) => {
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

export class User {
  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public username: string,
    public entryCount?: number
  ) {}

  save = async (): Promise<IUser> => {
    const userObject = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      username: this.username,
    };

    try {
      const userExists = await UserSchema.findOne({ username: this.username });
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
