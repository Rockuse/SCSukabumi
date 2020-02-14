const MongoDB=require('mongodb').MongoClient;
const dbConfig=require('../configs/dB_Config').atlas;

let connection =null;
const dbConnection={
    connect:callback=>{
         let url=dbConfig.host;
        //  let url=dbConfig.host+':'+dbConfig.port+'/'+dbConfig.name;
        MongoDB.connect(
            url,
            {
                useNewUrlParser:true,
                useUnifiedTopology: true
            },
            (err,db)=>
            {
                if(!err)
                {
                    connection=db.db(dbConfig.name);
                }
                else{console.log(`[MongoDB connection] ERROR: ${err}`);}
                callback(err,db)
            }
        );
    },
    getConnection:()=>{
        return connection;
    }
}
module.exports=dbConnection;