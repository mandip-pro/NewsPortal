import express from "express";
import cors from 'cors'
import { webRoute } from "./Router/web.js";
import Database from "./Connection/Database.js";
import DatabaseSeeder from "./Seeder/DatabaseSeeder.js";
const app = express();
app.use(express.json())
app.use(cors())
app.use("/api",webRoute);
app.use(express.static('Public'))
Database.connection()
DatabaseSeeder.run()
app.listen(3000, () => {
  console.log("http://127.0.0.1:3000");
});
