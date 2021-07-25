import { Request, Response, NextFunction } from "express";
import { checkForValidEmail } from "../utils";
import UserService from "../../model/schemas/Users/users.static";

const validateUserData = (req: Request, res: Response, next: NextFunction) => {
  const { first_name, last_name, email, username } = req.body;
  if (first_name && last_name && email && username) {
    if (checkForValidEmail(email)) {
      next();
    } else {
      res
        .status(400)
        .json({ error: "Please check the provided email!", email });
    }
  } else {
    res.status(400).json({ error: "Please check the provided user values!" });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const foundUser = await UserService.getUser(username);
    if (foundUser) return res.status(200).json({ data: foundUser });
    return res.status(404).json({ message: "User not found", username });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error retrieving user data", error });
  }
};

const createNewUser = async (req: Request, res: Response) => {
  const user = req.body;
  const { username } = req.body;
  try {
    const serverResponse = await UserService.createUser(user, username);
    if (serverResponse.username)
      return res.status(201).json({ message: `User ${username} created` });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    await UserService.deleteUser(username);
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ message: "Error deleting user", error });
  }
};

export { getUser, createNewUser, validateUserData, deleteUser };
