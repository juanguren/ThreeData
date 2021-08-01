import { Document } from "mongoose";

export interface IData extends Document {
  sector: String;
  year: String;
  timestamp: Date;
  user: Array<object>;
}
