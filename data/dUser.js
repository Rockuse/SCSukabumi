const DB=require('../models/database').getConnection();
const mUser=require('../models/mUser');
const coll=DB.collection('tmUser');
const userData={
    // Get Data
    getOne:(callback,user)=>{
        coll.find({username:user})
        .sort({username:1})
        .toArray((err,doc)=>{
           
            callback(doc);
            })
    },
    // Insert Data
    insertOne:(callback,user)=>{
        coll.insertOne(user,(err,doc)=>{
            callback(doc)
        })
    },
    // Update Password
    changePass:(callback,id)=>{
        coll.updateOne({'username':id.username},
            {$set:id},
            (err,doc)=>{
                callback(doc)
            })
    },

}

module.exports=userData;