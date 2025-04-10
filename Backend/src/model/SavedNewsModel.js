import mongoose from "mongoose";
import User from './UserModel.js'
import News from './NewsModel.js'
const savedNewsSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User
        },
        newsId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:News
        }
    },{
        versionKey:false
    }
)
export default mongoose.model('SavedNews',savedNewsSchema)