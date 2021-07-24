import { IUser } from "./users.type";
import UserSchema from "./users.model";

const createUser = async (user: IUser, username: string): Promise<IUser> => {
  try {
    const userExists = await UserSchema.findOne({ username: username });
    if (userExists) return userExists;

    return await UserSchema.create(user);
  } catch (error) {
    return error;
  }
};

const getUser = async (username: string): Promise<any> => {
  try {
    return await UserSchema.findOne({ username: username });
  } catch (error) {
    return error;
  }
};

export default { createUser, getUser };