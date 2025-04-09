import mongoose from "mongoose";
const newsSchema=new mongoose.Schema(
    {
        categoryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category",
            required:true
        },
        // postedBy:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"User",
        //     required:true
        // },
        title:{
            type:String,
            required:true
        },
        // for later accessing news 
        slug:{
            type:String,
            required:true,
            unique:true
        },
        description:{
            type:String,
            required:true
        },
        image:{
            type:String
        }
    },{
        versionKey:false
    }
)
export default mongoose.model('News',newsSchema)