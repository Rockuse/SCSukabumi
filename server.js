const express= require("express");
const morgan= require("morgan");
const app=express(); 
const con=require('./models/database')

con.connect((err,db)=>{
    if(err !=null){
        process.exit();
    }else{
        console.log('[DATABASE] Connected');
        const port = process.env.PORT || 4000;
        require("./routes/routes.js")(app)
        app.listen(port,()=>console.log(`Listen on Porn ${port}`));
    }
})


