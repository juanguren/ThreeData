import { IData } from "./data.type";
import DataSchema from "./data.model";

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
