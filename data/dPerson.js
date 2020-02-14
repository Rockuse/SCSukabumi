const DB=require('../models/database').getConnection();
const coll=DB.collection('tmPesonalData')
const personData={
    insertOne:(callback,data)=>{
        coll.insertOne(data,(err,doc)=>{
            callback(doc)
        })
    }

}

module.exports=personData