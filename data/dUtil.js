const DB=require('../models/database').getConnection();
const tmPerson=DB.collection('tmPerson')
const tmUser=DB.collection('tmUser')
const util={
    
    autoIncPerson:(callback)=>{
       let data=[]
        tmPerson.find({},{projection:{user_id:1,_id:0}})
        .sort({personId:-1})
        .limit(1)
        .toArray((err,doc)=>{
            
            console.log(doc)
        });
        tmUser.find({},{projection:{user_id:1,_id:0}})
        .sort({user_id:-1})
        .limit(1)
        .toArray((err,arr)=>{
            console.log(arr)
        });
    },
}

module.exports=util