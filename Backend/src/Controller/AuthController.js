import User from "../model/UserModel.js"

class AuthController{
    async login(req,res){
        let {email,password}=req.body
        const findUser=await User.findOne({email:email})
        if(!findUser){
            res.status(500).json({message:"no user",state:false})
        }else{
            let isMatch=await findUser.comparePassword(password)
            if(!isMatch){
                res.status(404).json({message:'incorrect password',state:false})
            }else{
                // let secret=process.env.JWT_SECRET
                // let expiry=process.env.JWT_EXPIRES_IN
                // const token=jwt.sign({id:findUser._id}, secret ,{expiresIn:expiry})
                const token=await findUser.generateToken()
                const cookieOptions={
                    expires:new Date(Date.now()+24*60*60*1000),//1d
                    httpOnly:true,
                    secure:process.env.NODE_ENV === 'production',
                    sameSite:'Strict'
                }
                res.cookie('jwt',token,cookieOptions)
                res.status(200).json({message:"sucessful login",state:true ,token:token,findUser})
            }
        }
    }
    async logOut(req,res) {
        try{
                res.clearCookie('jwt')
                res.status(200).json({message:'logged out successfully',state:true})    
        }catch(err){
            res.status(500).json({message:"error logging out",state:false})
        }
    }
}
export default AuthController