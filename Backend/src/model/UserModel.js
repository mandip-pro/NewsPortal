import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import  dotenv from "dotenv";
dotenv.config()

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            enum:["male","female"],
            required:true
        },
        role:{
            type:String,
            enum:["admin","user"],
            default:"user"
        },
        dateAdded:{
            type:Date,
            default:Date.now
        },image:{
            type:String
            
        }
    },{
        versionKey:false
    }
)
//hash password
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10)
    }
    next()
})
//compare password
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
//generate token
userSchema.methods.generateToken=async function(){
    let secret=process.env.JWT_SECRET
    let expiry=process.env.JWT_EXPIRES_IN
    return jwt.sign({id:this._id}, secret ,{expiresIn:expiry})
}
//delete password field
userSchema.methods.toJSON=function(){
    const user=this
    if (user.image){
        user.image=`http://127.0.0.1:3000/users/${user.image}`
    }
    const userObject=user.toObject()
    delete userObject.password
    return userObject
}
export default mongoose.model("User",userSchema)