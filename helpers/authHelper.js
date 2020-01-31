const jwt=require('jsonwebtoken');
const responHandler=require('./Helper');
const auth =require('../configs/authconfig.json').secretKey
module.exports={
    checkToken:(req,res,next)=>{
        if(!req.headers.authorization){
            responHandler.sendResponse(res,403,'You Have No Power Here')
        } else {
            let token=req.headers.authorization;
            jwt.verify(token,auth,(err,decoded)=>{
                if(typeof decoded==undefined){
                    responHandler.sendResponse(res,200,'You Have No Power Here OOOPS');
                }else{
                    req.userdata=decoded;
                    next();
                }
            })
        }
    }
}
