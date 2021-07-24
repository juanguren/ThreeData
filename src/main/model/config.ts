import Mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const databaseConnection = async () => {
  const { DB_PASSWORD } = process.env;
  const URI = `mongodb+srv://juanguren:${DB_PASSWORD}@cluster0.3u8p3.mongodb.net/three_data?retryWrites=true&w=majority`;

  Mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  // Helpers
  const database = Mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export default databaseConnection;
