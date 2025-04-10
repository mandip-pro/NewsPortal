import News from "../model/NewsModel.js"
import SavedNews from "../model/SavedNewsModel.js"
class SavedNewsController{


    async get(req,res){
        const {userId}=req
        console.log(userId)
        try{
            const responce=await SavedNews.find({userId:userId})
            console.log(responce)
            res.status(200).json({message:'successfully fetched data',state:true,data:responce})
        }catch(err){
            console.log(err)
            res.status(500).json({message:'cannot get saved items',state:false})
        }
    
    }
    async post(req,res){
        const {userId}=req
        const newsId=req.params.id
        
        try {
            const findNews = await News.findById(newsId);
            if (!findNews) {
                
              return res
                .status(500)
                .json({ message: "Cannot find News with such id", state: false });
            }
           const existingSaved=await SavedNews.findOne({userId,newsId})
           if(existingSaved){
            res.status(400).json({message:"already saved product",state:false})
           }
            const newSavedNews = new SavedNews({ userId, newsId});
            await newSavedNews.save();
            res
              .status(200)
              .json({
                message: "News saved successfully",
                state: true,
                newSavedNews,
                newsData:findNews,
              });
          } catch (err) {
            res
              .status(400)
              .json({ message: "error in saving news", state: false });
          }


    }

    async delete(req,res){
        const savedId=req.params.id
        try{
            const responce=await SavedNews.findByIdAndDelete(savedId)
            res.status(200).json({message:'deleated successfully',state:true})
        }catch(err){
            console.log(err)
            res.status(500).json({message:'error deletind savedNews',state:false})
        }
    }
}
export default SavedNewsController