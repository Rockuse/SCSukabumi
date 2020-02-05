const express= require("express");
const morgan= require("morgan");
const bodyParser=require('body-parser')
const app=express(); 
const con=require('./models/database')

con.connect((err,db)=>{
    if(err !=null){
        process.exit();
    }else{
        console.log('[DATABASE] Connected');
        const port = process.env.PORT || 4000;
 
        app.use(bodyParser.json()); 
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.raw({type: '*/*' }))
        // app.configure(function(){
        //     app.use(express.bodyParser());
        //     app.use(app.router);
        //   });
        require("./routes/routes.js")(app)
        app.listen(port,()=>console.log(`Listen on Porn ${port}`));
    }
})


