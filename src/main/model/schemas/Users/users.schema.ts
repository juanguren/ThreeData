import { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  entryCount: { type: Number, required: false, default: 0 },
});

export { UserSchema };
