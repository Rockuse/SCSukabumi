const Database=require('../models/database');
const ObjectID=require('mongodb').ObjectID;
const M_City=require('../models/M_City')
const db=Database.getConnection();
const tbl=db.collection('tblcity');
const cityData={
    getAll: callback=>{ // Select All
        tbl.find()
        .sort({city_code:1})
        .toArray((err,doc)=>{
        let city= doc.map(row=>{
            return new M_City(row);
        });
            callback(city)
        });
        
    },
    getOne: (callback,id)=>{ // Select 1
        tbl.find({city_name:id})
        .sort({city_code:1})
        .toArray((err,doc)=>{
            let city=doc.map(row=>{
                return new M_City(row);
            });
            callback(city);
            })
    },
    DelOne: (callback,id)=>{
        tbl.deleteOne({city_code:id});
            
    }
}
module.exports=cityData;