const dUser = require('../data/dUser');
const helper = require('../helpers/Helper');
const jwt = require('jsonwebtoken');
const bt = require('bcryptjs')
const key = require('../configs/authconfig.json').secretKey
const apiUser = {
    getUser: (req, res, next) => {
        let username = req.params.tes
        dUser.getOne(items => {
            helper.sendResponse(res, 200, items)
        }, username)
    },
    userAuth: (req, res, next) => {
        let pass = req.body.password;
        let username = req.body.username;
        
        dUser.getOne(item => {
            if (item[0]) {
                if (bt.compareSync(pass, item[0].password)) {
                    let token = jwt.sign(item[0], key)
                    delete item[0].password;
                    let doc = {
                        userdata: item[0],
                        token: token
                    }
                    helper.sendResponse(res, 200, doc)
                } else {
                    helper.sendResponse(res, 400, 'Wrong Username or Password')
                }
            } else {
                helper.sendResponse(res, 400, 'Username Not Found')
            }
        }, username)
    },
    insertAdmin: (req, res, next) => {
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
                    bt.hash(password, salt, (err, hash) => {
                        newUser.password = hash
                        dUser.insertOne(items => {
                            helper.sendResponse(res, 200, items);
                        }, newUser);
                    })
                })
            }
        }, username)
    },
    changePass: (req, res, next) => {
        let username = req.body.username;
        let newPass = req.body.newPass
        dUser.getOne(item => {
            if (item.username == username) {
                const updatePass = {
                    username: username,
                    password: toString(newPass),
                    modifiedby: 'fahmi',
                    modifieddate: new Date()
                }
                bt.genSalt(10, (err, salt) => {
                    bt.hash(newPass, salt, (err, hash) => {
                        updatePass.password = hash;
                        dUser.changePass(items => {
                                helper.sendResponse(res, 200, items)
                            },
                            updatePass)
                    })
                })
            } else {
                helper.sendResponse(res, 404, 'not Found')
            }
        }, username)
    },
    increment:(req,res,next)=>{
        dUser.autoInc(item=>{
        helper.sendResponse(res,200,item)
        })
    }
}

module.exports = apiUser;