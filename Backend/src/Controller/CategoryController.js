import Category from "../model/Category.js";
class CategoryController{
    async get(req, res) {
        try {
            const data = await Category.find({});
            res.status(200).json({ message: "received", data });
          } catch (error) {
            res.status(500).json({ message: "error getting data", error });
          }
      }
      async getByName(req,res){
        try {
          const {name}=req.params
          console.log(name)
          const data = await Category.find({name:name});
          res.status(200).json({ message: "received", data });
        } catch (error) {
          res.status(500).json({ message: "error getting data", error });
        } 
      }
      async post(req, res) {
        try {
            
            const responce=await Category.create(req.body);
            res.status(200).json({ message: "hello post" ,responce});
          } catch (error) {
            res.status(500).json({ message: "error posting data", error });
          }
      }
      async put(req, res) {
        try {
          await Category.findByIdAndUpdate(req.params.id, req.body);
          res.status(200).json({ message: "updated" });
        } catch (error) {
          res.status(500).json({ message: "error editing data", error });
        }
      }
    
      async delete(req, res) {
        try {
          await Category.findByIdAndDelete(req.params.id);
          res.status(200).json({ message: "deleated successfully" });
        } catch (error) {
          res.status(500).json({ message: "error deleting data", error });
        }
      }


}
export default CategoryController