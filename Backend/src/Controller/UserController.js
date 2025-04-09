import User from "../model/UserModel.js";
// import bcrypt from "bcrypt"
class UserController {

  async post(req, res) {
    try {

      //hashing
      // let password=req.body.password
      // let hashedPassword=await bcrypt.hash(password,10)
      // req.body.password=hashedPassword
      let image =''
      if(req.file){
        image=req.file.filename
      }
      await User.create({...req.body,image});
      res.status(200).json({ message: "succesfully posted user" ,state:true});
    } catch (error) {
      res.status(500).json({ message: "error posting data" ,state:false, error });
      console.log(error)
    }
  }

  async get(req, res) {
    try {
      const data = await User.find({});

      //remove password field from api
      // data.map((datum)=>{
      //   datum.password=undefined
      //   return datum
      // })

      res.status(200).json({ message: "received", data });
    } catch (error) {
      res.status(500).json({ message: "error getting data", error });
    }
  }

  async getOneUser(req,res){
    try{
      const data=await User.findById(req.params.id)
      res.status(200).json(data)
    }catch(errror){
      res.status(500).json({message:"no user of this id",errror})
    }
  }

  async put(req, res) {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "updated" });
    } catch (error) {
      res.status(500).json({ message: "error editing data", error });
    }
  }

  async delete(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "deleated successfully" });
    } catch (error) {
      res.status(500).json({ message: "error deleting data", error });
    }
  }
}
export default UserController;
