import { IData } from "./data.type";
import DataSchema from "./data.model";
// * https://medium.com/@mendes.develop/joining-tables-in-mongodb-with-mongoose-489d72c84b60

const saveDataRecords = async (dataObject: any): Promise<IData> => {
  try {
    return await DataSchema.create(dataObject);
  } catch (error) {
    return error;
  }
};

export default {
  saveDataRecords,
};
