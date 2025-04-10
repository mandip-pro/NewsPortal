import express from "express";
import userRoute from "./User.js";
import newsRoute from "./News.js";
import categoryRoute from "./Category.js";
import authRoute from "./Auth.js";
import savedNewsRoute from "./SavedNews.js";
const webRoute = express.Router();

webRoute.get("/",(req,res)=>{
    res.json({message:"no prompt"})
})
webRoute.use("/user", userRoute);
webRoute.use("/news", newsRoute);
webRoute.use('/category',categoryRoute)
webRoute.use('/auth',authRoute)
webRoute.use('/saveNews',savedNewsRoute)
export { webRoute };
