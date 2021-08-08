import { Document } from "mongoose";

export interface IData extends Document {
  data: dataResult[];
  timestamp: Date;
}

interface dataResult {
  sector: String;
  product: String;
  name: String;
  year: String;
}
