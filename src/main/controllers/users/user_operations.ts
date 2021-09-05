import { Request, Response, NextFunction } from 'express';
import { checkForValidEmail, userNotFoundHandler } from '../utils';
import UserService from '../../model/schemas/Users/users.static';
import { User } from '../../model/schemas/Users/users.static';

const validateUserData = (req: Request, res: Response, next: NextFunction) => {
  const { first_name, last_name, email, username } = req.body;

  if (first_name && last_name && email && username) {
    if (checkForValidEmail(email)) return next();
    return res
      .status(400)
      .json({ error: 'Please check the provided email!', email });
  } else {
    res.status(400).json({ error: 'Please check the provided user values!' });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const foundUser = await UserService.getUser(username);
    if (foundUser) return res.status(200).json({ data: foundUser });
    return res.status(404).json(userNotFoundHandler(username));
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error retrieving user data', error });
  }
};

const createNewUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, username } = req.body;
  try {
    const user = new User(first_name, last_name, email, username);
    const userCreated = await user.save();
    if (userCreated.username)
      return res.status(201).json({ message: `User ${username} created` });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    await UserService.deleteUser(username);
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ message: 'Error deleting user', error });
  }
};

export { getUser, createNewUser, validateUserData, deleteUser };
