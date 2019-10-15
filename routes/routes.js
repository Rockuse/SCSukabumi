const data=require("../api/City_API")

module.exports=app=>{
    app.get("/", (req, res) => res.send('<head>tes tes<head>'));
    app.get("/hola",data.read);
    app.get("/hola/:tes",data.getOne);
}
