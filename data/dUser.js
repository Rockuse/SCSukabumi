const DB=require('../models/database').getConnection();
const mUser=require('../models/mUser');
const coll=DB.collection('tmUser');
const userData={
    // Get Data
    getOne:(callback,user)=>{
        coll.find()
        .sort({username:1})
        .toArray((err,doc)=>{
            console.log(doc)
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
    autoInc:(callback)=>{
        coll.find({},{projection:{user_id:1,_id:0}})
        .sort({user_id:-1})
        .limit(1)
        .toArray((err,doc)=>{
            console.log(doc)
            callback(doc)})
    }

}

module.exports=userData;