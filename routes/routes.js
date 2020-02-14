const user=require('../api/apiUser');
const person=require('../api/apiPerson')
const auth=require('../helpers/authHelper').checkToken
module.exports=app=>{
    app.get('/hola/:tes',user.getUser);
    app.get('/auth/login/:tes',user.getUser);
    app.get('/tes',user.auto)
    app.post('/auth/login',user.userAuth);
    app.post('/auth/login/change',user.changePass);
    app.post('/auth/register',person.insertPerson);
}
