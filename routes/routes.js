const data=require('../api/apiUser')
const auth=require('../helpers/authHelper').checkToken
module.exports=app=>{
    app.get('/hola/:tes',auth,data.getUser);
    app.get('/auth/login/:tes',data.getUser);
    app.post('/auth/login',data.userAuth);
    app.post('/auth/login/change',data.changePass);
}
