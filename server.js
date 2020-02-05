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
        var rawBodySaver = function (req, res, buf, encoding) {
            if (buf && buf.length) {
              req.rawBody = buf.toString(encoding || 'utf8');
            }
          }
        app.use(bodyParser.json({ verify: rawBodySaver})); 
        app.use(bodyParser.urlencoded({ verify: rawBodySaver,extended:true}))
        app.use(bodyParser.raw({ verify: rawBodySaver,type: '*/*' }))
        // app.configure(function(){
        //     app.use(express.bodyParser());
        //     app.use(app.router);
        //   });
        require("./routes/routes.js")(app)
        app.listen(port,()=>console.log(`Listen on Porn ${port}`));
    }
})


