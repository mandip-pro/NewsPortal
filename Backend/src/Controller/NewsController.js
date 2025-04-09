import News from "../model/NewsModel.js";
import mongoose from "mongoose";
class NewsController {
  async get(req, res) {
    try {
        const data = await News.find({});
        res.status(200).json({ message: "received", data });
      } catch (error) {
        res.status(500).json({ message: "error getting data", error });
      }
  }

  async getSingleNews(req, res) {
    try{
        const data=await News.findById(req.params.id)
        res.status(200).json(data)
      }catch(errror){
        res.status(500).json({message:"no news of this id",errror})
      }
  }
  async post(req, res) {
    try {
        const {title,description,slug,categoryId}=req.body
         const data={title,description,slug,image:`http://127.0.0.1:3000/news/${req.file.filename}`,categoryId}
        await News.create(data);
        res.status(200).json({ message: "hello post" });
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error posting data", error });
      }
  }
  
  async put(req, res) {
    try {
      await News.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "updated" });
    } catch (error) {
      res.status(500).json({ message: "error editing data", error });
    }
  }

  async delete(req, res) {
    try {
      await News.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "deleated successfully" });
    } catch (error) {
      res.status(500).json({ message: "error deleting data", error });
    }
  }
}
export default NewsController;
