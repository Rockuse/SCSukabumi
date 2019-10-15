const MongoDB=require('mongodb');
const dbConfig=require('../configs/dB_Config');

let connection =null;
const dbConnection={
    connect:cb=>{
        let url=dbConfig.host+':'+dbConfig.port+'/'+dbConfig.name;
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
                cb(err,db)
            }
        );
    },
    getConnection:()=>{
        return connection;
    }
}
module.exports=dbConnection;