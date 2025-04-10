import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
class RouteMiddlewere{
    static check(req,res,next){
        const skey=process.env.JWT_SECRET
        let token=req.headers['authorization']
        if(!token){
            res.status(500).json({message:'cant authenticate user token'})
        }
        //token verify
        try{
            token=token.split(' ')[1]
            const result=jwt.verify(token,skey)
            req.userId=result.id
            next()
        }catch(err){
            console.log(err)
            res.status(400).json({message:"error verifying"})
        }
        
    }
}
export default RouteMiddlewere