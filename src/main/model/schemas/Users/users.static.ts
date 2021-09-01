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

const updateUserSearchCount = async (
  username: string
): Promise<IUser | null> => {
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

  save = async (userObject: any): Promise<IUser> => {
    try {
      const userExists = await this.getUser(this.username);
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
