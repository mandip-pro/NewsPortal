import express from "express";
import UserController from "../Controller/UserController.js";
import ImageUploadMiddlewere from "../middlewere/ImsgeUploadMiddleware.js";
import RouteMiddlewere from "../middlewere/RouteMiddlewere.js";

const userRoute = express.Router();
const userInstance = new UserController();
const imageInstance=new ImageUploadMiddlewere();

const uploadImage=imageInstance.upload('users')

userRoute.post("/", uploadImage.single('image'), userInstance.post);
userRoute.get("/",RouteMiddlewere.check,userInstance.get)
userRoute.get('/:id',userInstance.getOneUser)
userRoute.put("/:id",userInstance.put)
userRoute.delete("/:id",userInstance.delete)
export default userRoute;
