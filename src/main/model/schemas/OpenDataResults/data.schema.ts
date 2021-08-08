import { Schema } from "mongoose";

const dataResults: Schema = new Schema({
  sector: { type: String, required: true },
  product: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: String, required: true },
});

const DataSchema: Schema = new Schema({
  data: [dataResults],
  timestamp: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export { DataSchema };
