import { Schema } from "mongoose";

const DataSchema: Schema = new Schema({
  sector: { type: String, required: true },
  year: { type: String, required: true },
  timestamp: { type: Date, required: true },
  queries: [{ type: Schema.Types.ObjectId, ref: "Data" }],
});

export { DataSchema };
