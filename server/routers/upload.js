var express=require("express");
var formidable=require("formidable");

var fs=require("fs");
var path=require("path")

var status=require("../modules/status")

var router=new express.Router();

var upload_img_dir="upload_img"
var PICNAME="vb"
// var domain="//127.0.0.1:1337"
var domain='//193.112.82.136:1337'
router.post('/upload_img',(req,res)=>{
	var form=new formidable.IncomingForm();
    //console.log(__dirname); E:\jsnode\Blog\routers  

    form.uploadDir=path.resolve("public/"+upload_img_dir)
    form.keepExtensions=true;
    form.parse(req,function(err,fields,files){
    	if(err){
            res.json(status.UPLOAD_ERROR)
            return
        }
        var oldPath=files[PICNAME].path;       //这里其实还可以优化，因为没有上传题图的时候，会产生一个0kb的文件
        var oldName=files[PICNAME].name;
        var date=new Date();
        var dateTime=date.getTime().toString();
        // var splited=oldName.split('.')
       	// var suffix=splited.pop()
       	// var prefix=splited.join(".")
        // var newName=prefix+dateTime+"."+suffix;

        var name=oldPath.match(/\/([^.\/]+?\.[\s\S]+)/)[1]
        console.log('---------',oldPath,oldName,name)
        res.json(Object.assign({
        	url:domain+'/'+upload_img_dir+"/"+name
        },status.QUERY_SUCCESS))
        // fs.rename(oldPath,newPath,function(renameErr){
        //     if(renameErr){
        //         res.json(status.UPLOAD_ERROR)
        //         return
        //     }
        //     res.json(Object.assign({
        //     	url:'/'+upload_img_dir+"/"+name
        //     },status.QUERY_SUCCESS))
        // });
    });
})



module.exports=router