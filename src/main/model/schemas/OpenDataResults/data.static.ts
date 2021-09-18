import { IData } from './data.type';
import DataSchema from './data.model';
// * https://medium.com/@mendes.develop/joining-tables-in-mongodb-with-mongoose-489d72c84b60

const saveDataRecord = async (dataObject: any): Promise<any> => {
  try {
    return await DataSchema.create(dataObject);
  } catch (error) {
    return error;
  }
};

const getQueries = async (userId: string) => {
  try {
    return await DataSchema.findOne({ user: userId });
  } catch (error) {
    return error;
  }
};

export default {
  saveDataRecord,
  getQueries,
};
