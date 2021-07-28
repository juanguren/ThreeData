import { Request, Response, NextFunction } from "express";
import sendGrid from "@sendgrid/mail";
import { constructMessageLayout } from "../../view/messageTemplate";
import UserService from "../../model/schemas/Users/users.static";
import retrieveOpenData from "../../services/open_data";
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

const validateRecipient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const executeOperation = async (req: Request, res: Response, userData: any) => {
  const { year, department, limit } = req.body.data_package;
  const { APP_TOKEN } = process.env;
  try {
    const dataToSend = await retrieveOpenData(
      year,
      department,
      APP_TOKEN,
      limit
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};

const sendMessageWithData = (userData: any, openData: Array<object>) => {
  const { email } = userData;
  const sendGridAPI: string = process.env.SEND_API!;
  try {
    sendGrid.setApiKey(sendGridAPI);
    const messageBody: any = {
      to: email,
      from: "juanararo@unisabana.edu.co",
      subject: "HEY!",
    };
    const messageLayout = constructMessageLayout(openData, userData);
    messageBody.html = messageLayout;

    (async () => {
      try {
        const messageResponse = await sendGrid.send(messageBody);
        const code = messageResponse[0].statusCode;
      } catch (error) {}
    })();
  } catch (error) {}
};

export { validateDataPackage, sendMessageWithData, validateRecipient };
