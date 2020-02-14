const dPerson=require('../data/dPerson');
const dUser = require('../data/dUser');
const apiUser=require('./apiUser');
const helper = require('../helpers/Helper');
const jwt = require('jsonwebtoken');
const bt = require('bcryptjs')
const key = require('../configs/authconfig.json').secretKey

apiPerson={
    insertPerson:(req,res)=>{
        const arrPerson=['name','address','phone','chapterId','email'];
        const arrUser=['','','','',''];
        const person=new req.body;
        const user=new req.body;
        Object.keys(person).map((val)=>{
            arrPerson.find(ele=>{
                if(val!=ele){
                    delete eval(`person.${val}`);
                }
            })
        })
        Object.keys(user).map((val)=>{
            arrUser.find(ele=>{
                if(val!=ele){
                    delete eval(`user.${val}`);
                }
            })
        })
        dPerson.insertPerson(items=>{
            helper.sendResponse(res,200,items)
        },person)
        
    },
    insertUser: (req, res) => {
        let username = req.body.username
        dUser.getOne(item => {
            if (item.username) {
                helper.sendResponse(res, 401, 'Username Already Exist!')
            } else {
                const newUser = {
                    username: req.body.username,
                    password: req.body.password,
                    modifiedby: 'fahmi',
                    modifieddate: Date.now(),
                    type: parseInt(req.body.type)
                }
                dUser.autoInc(item=>{
                    newUser.user_id=parseInt(item[0].user_id)+1
                    })
                bt.genSalt(10, (err, salt) => {
                    bt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash
                        dUser.insertOne(items => {
                            helper.sendResponse(res, 200, items);
                        }, newUser);
                    })
                })
            }
        }, username)
    },
}
module.exports=apiPerson