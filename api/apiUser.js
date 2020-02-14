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
  
    changePass: (req, res, next) => {
        let username = req.body.username;
        let newPass = req.body.password
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
    auto:(req,res,next)=>{
        dUser.autoInc(item=>{
            console.log(item)
        })
    }

}

module.exports = apiUser;