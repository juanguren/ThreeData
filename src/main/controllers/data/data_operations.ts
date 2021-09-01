import { Request, Response, NextFunction } from 'express';
import sendMessageWithData from '../../services/sendgrid';
import UserService from '../../model/schemas/Users/users.static';
import DataService from '../../model/schemas/OpenDataResults/data.static';
import {
  organizeDataIntoRecords,
  validDepartments,
  userNotFoundHandler,
} from '../utils';
import retrieveOpenData from '../../services/open_data';
import { IUser } from '../../model/schemas/Users/users.type';
import { EventEmitter } from 'events';
import dotenv from 'dotenv';

const emitter = new EventEmitter();
dotenv.config();

// * Logs when a data package is successfuly sent and recorded for X user.
emitter.on('record_saved', (user, recordId) => {
  console.log(`Record ${recordId} saved for ${user}`);
});

const validateDataPackage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { year, department } = req.body.data_package;
  const validParams = ['year', 'department'];
  if (year && department) {
    if (validDepartments.includes(department)) {
      next();
    } else {
      return res.status(422).json({
        message: 'Please check the "department"',
        received: department,
      });
    }
  } else {
    return res
      .status(422)
      .json({ message: 'Error, missing param', validParams });
  }
};

const validateRecipient = async (req: Request, res: Response) => {
  const { username } = req.body.recipient;
  try {
    const foundUser = await UserService.getUser(username);
    if (foundUser.username)
      await executeOperation(req, res, foundUser, username);
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Please check the username', username, error });
  }
};

const executeOperation = async (
  req: Request,
  res: Response,
  userData: IUser,
  username: string
) => {
  const { _id: userId } = userData;
  const { year, department, limit } = req.body.data_package;
  const { APP_TOKEN } = process.env;
  try {
    const openDataResult = await retrieveOpenData(
      year,
      department,
      APP_TOKEN,
      limit
    );
    const sendMessage = await sendMessageWithData(userData, openDataResult);
    const { status: code, message } = sendMessage;

    if (code === 202) {
      const timestamp = new Date();
      const organizedData = organizeDataIntoRecords(openDataResult);
      const dataRecordObject = {
        data: organizedData,
        timestamp,
        user: userId,
      };
      const dataRecord = await DataService.saveDataRecord(dataRecordObject);
      if (dataRecord.id) {
        emitter.emit('record_saved', username, dataRecord.id);
        await UserService.updateUserSearchCount(username);
        return res.status(code).json({ message });
      } else {
        throw 'Error updating userCount.';
      }
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const checkForUserQueries = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const foundUser = await UserService.getUser(username);
    if (foundUser) {
      const { _id: userId } = foundUser;
      const dataResult = await DataService.getQueries(userId);
      res.status(200).json(dataResult);
    } else {
      res.status(404).json(userNotFoundHandler(username));
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { validateDataPackage, validateRecipient, checkForUserQueries };
