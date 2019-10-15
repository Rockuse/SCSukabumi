function M_City(data){
this._id            =data._id;
this.city_code      =data.city_code;
this.city_name      =data.city_name;
this.active_status  =data.active_status;
this.modified_by    =data.modified_by;
this.created_by     =data.created_by;
this.modified_date  =data.modified_date;
this.created_date   =data.created_date;
};
M_City.prototype.getData=()=>{
return{
   _id:this._id            ,
   city_code:this.city_code      ,
   city_name:this.city_name      ,
   active_status:this.active_status,  
   modified_by:this.modified_by    ,
   created_by:this.created_by     ,
   modified_date:this.modified_date,  
   created_date:this.created_date   
};
};
module.exports=M_City;