import express from "express"
import NewsController from "../Controller/NewsController.js"
import ImageUploadMiddlewere from "../middlewere/ImsgeUploadMiddleware.js"

const newsRoute=express.Router()
const NewsInstance=new NewsController
const imageInstance=new ImageUploadMiddlewere();

const uploadImage=imageInstance.upload('news')


newsRoute.get('/',NewsInstance.get)
newsRoute.get('/:id',NewsInstance.getSingleNews)
newsRoute.post('/', uploadImage.single('image'),NewsInstance.post)
newsRoute.delete('/:id',NewsInstance.delete)
newsRoute.put('/:id',NewsInstance.put)
export default newsRoute