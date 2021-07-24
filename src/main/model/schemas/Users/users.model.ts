import { model } from "mongoose";
import { IUser } from "./users.type";
import { UserSchema } from "./users.schema";

export default model<IUser>("User", UserSchema);
