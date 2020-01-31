function mUser(data){
this._id        =data._id;
this.username   =data.username;
this.password   =data.password;
this.type       =data.type;
this.user_id    =data.user_id;
}

mUser.prototype.getData=()=>{
    return{
        _id:this._id,
        username:this.username,
        password:this.password,
        type:this.type,
        user_id:this.user_ID
    };
};
module.exports=mUser;