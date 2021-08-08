import { model } from "mongoose";
import { IData } from "./data.type";
import { DataSchema } from "./data.schema";

export default model<IData>("Data", DataSchema);
