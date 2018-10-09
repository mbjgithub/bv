    var express=require("express");
var UserModel=require("../models/user");
var router=express.Router();

var commErrHandler=require('../modules/comm-error-handler')
var status=require('../modules/status')

router.get("/register_miaomiao",register("get"));   

router.post("/register",register("post"));

router.post("/login_judge",function(req,res){
     var body=req.body
     var username=body.username;
     var password=body.password;
     if(!username || !password){
        res.json({iErrCode:1009,errMsg:'username or password is empty'})
        return
     }
     UserModel.findOne({username,password},function(err,doc){
         if(err){
         	console.log("query mongodb error");
            res.json(status.QUERY_ERROR)
         	return;
         }
         if(!doc){
            res.json(status.QUERY_EMPTY)
            return
         }
         //这里把cookie设置到浏览器里面一直设置不成功，改前端设置
         res.cookie('vuid',`${username}_${password}`,{
            maxAge:172800000,
            domain:'127.0.0.1'
         })
         res.json(status.QUERY_SUCCESS)
     });
});

module.exports=router;


function register(method){
    var isPost=method == "post" ? true : false
    return function(req,res){
        var data=isPost ? req.body : req.query
        var username=data.username;
         var password=data.password;
         var user=new UserModel({username,password});
         user.save(commErrHandler(req,res))
    }
}