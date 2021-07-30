import { Request, Response, NextFunction, response } from "express";
import sendMessageWithData from "../../services/sendgrid";
import UserService from "../../model/schemas/Users/users.static";
import retrieveOpenData from "../../services/open_data";
import { IUser } from "../../model/schemas/Users/users.type";
import dotenv from "dotenv";

dotenv.config();

const validateDataPackage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { year, department } = req.body.data_package;
  const validParams = ["year", "department"];
  year && department
    ? next()
    : res.status(422).json({ message: "Error, missing param", validParams });
};

const validateRecipient = async (req: Request, res: Response) => {
  const { username } = req.body.recipient;
  try {
    const foundUser = await UserService.getUser(username);
    if (foundUser.username) executeOperation(req, res, foundUser);
  } catch (error) {
    res
      .status(422)
      .json({ message: "Please check the username", username, error });
  }
};

const executeOperation = async (
  req: Request,
  res: Response,
  userData: IUser
) => {
  const { year, department, limit } = req.body.data_package;
  const { APP_TOKEN } = process.env;
  try {
    const dataToSend = await retrieveOpenData(
      year,
      department,
      APP_TOKEN,
      limit
    );
    const sendMessage = await sendMessageWithData(userData, dataToSend);
    const { status: code, message } = sendMessage;
    res.status(code).json({ message });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export { validateDataPackage, validateRecipient };
