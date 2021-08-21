import { Router, json } from 'express';
import {
  validateDataPackage,
  validateRecipient,
  checkForUserQueries,
} from '../controllers/data/data_operations';

const dataRouter = Router();
dataRouter.use(json());

dataRouter.get('/:username', checkForUserQueries);
dataRouter.post('/send', validateDataPackage, validateRecipient);

export default dataRouter;
