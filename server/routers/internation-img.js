var express = require("express");
var ImgModel = require("../models/internation-img");

var router = express.Router();
var status =require("../modules/status")
var commErrHandler=require('../modules/comm-error-handler')
/**
 * [添加图片]
 * @param  {[type]} req  [description]
 * @param  {[type]} res) {               var {strName,type} [description]
 * @return {[type]}      [description]
 */
router.post("/modify_internation_img", function(req, res) {
    var {strImg,_id}=req.body
    if(!strImg){
        res.json(Object.assign({},status.INPUT_ERROR))
        return
    }
    if(!_id){
        var img=new ImgModel({strImg})
        img.save(commErrHandler(req,res))
    }else{
        var $update={strImg}
        ImgModel.update({
            _id
        },$update,commErrHandler(req,res))
    }
});

router.get('/get_internation_img',(req,res)=>{
    var {callback}=req.query
    ImgModel.findOne({
    },(err,doc)=>{
        if(err){
            res.json(status.QUERY_ERROR)
            return
        }
        console.log("######",doc)
        var result=Object.assign({},status.QUERY_SUCCESS,doc&&doc._doc || {})
        if(!callback){
            res.json(result)
        }else{
            res.end(`${callback}(${JSON.stringify(result)})`)
        }
    })
})


module.exports = router;
