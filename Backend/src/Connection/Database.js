import mongoose from "mongoose";

class Database {
  static async connection(req, res) {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/NewsData");
      console.log("DB connected successfully");
    } catch (err) {
      console.log("cant connect to DB");
    }
  }
}
export default Database