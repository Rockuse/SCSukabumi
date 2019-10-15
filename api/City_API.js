const DCity=require('../data/D_City')
const Helper=require('../helpers/Helper')
const City_API={
read:(req,res,next)=>{
    DCity.getAll(items=>{
        Helper.sendResponse(res,200,items);
    })
},
getOne:(req,res,next)=>{
    let id = req.params.tes
    DCity.getOne(items=>{
        Helper.sendResponse(res,200,items)
    },id)
}
}
module.exports=City_API