var express = require("express");
var VisualModel = require("../models/visual");

var router = express.Router();
var status =require("../modules/status")
var commErrHandler=require('../modules/comm-error-handler')

/**
 * [添加视觉]
 * @param  {[type]} req  [description]
 * @param  {[type]} res) {               var {strName,type} [description]
 * @return {[type]}      [description]
 */
router.post("/modify_visual", function(req, res) {
    var {strName,strImg,_id,update}=req.body
    if(!strName||!strImg){
       res.json(Object.assign({},status.INPUT_ERROR,{errMsg:'lack of needed field'}))
       return 
    }
    //新增
    if(!+update){
        var order=+new Date() 
        var visual=new VisualModel({strName,strImg,order})
        visual.save(commErrHandler(req,res))
    }else{   //修改
        var $update={strName,strImg}
        VisualModel.update({
            _id
        },$update,commErrHandler(req,res))
    }
});

/**
 * 删除视觉
 * @param  {[type]} "/del_visual" [description]
 * @param  {[type]} (req,res)      [description]
 * @return {[type]}                [description]
 */
router.post("/del_visual",(req,res)=>{
    var {id}=req.body
    var $update={isDel:true}
    VisualModel.update({
        _id:id
    },$update,commErrHandler(req,res))
})

/**
 * 视觉列表
 * @param  {[type]} "/visual_list"           [description]
 * @param  {[type]} (req,res)                 [description]
 * @param  {[type]} null                      [description]
 * @param  {[type]} options.sort:{order:-1} [description]
 * @param  {[type]} (err,docs                 [description]
 * @return {[type]}                           [description]
 */
router.get("/visual_list",(req,res)=>{
    var {callback}=req.query
    VisualModel.find({isDel:{$ne:true}},null,{sort:{order:-1}},(err,docs)=>{
        if(err){
            res.json(status.QUERY_ERROR)
            return
        }
        var result=Object.assign({},status.QUERY_SUCCESS,{
            vecVisual:docs || []
        })
        if(!callback){
            res.json(result)
        }else{
            res.end(`${callback}(${JSON.stringify(result)})`)
        }
    })
})

router.get("/change_visual_order",(req,res)=>{
    var {visualId1,visualId2}=req.query

    VisualModel.find({
        isDel:{$ne:true},
        _id:{$in:[visualId1,visualId2]}
    },(err,docs)=>{
        console.log(err,docs)
        if(err || docs.length<2){
            res.json(status.QUERY_ERROR)
            return
        }
        console.log("DOCS",docs)
        var item1=docs[0]
        var item2=docs[1]
        var order=item2.order
        item2.order=item1.order
        item1.order=order
        item2.save((err2)=>{
            item1.save(commErrHandler(req,res))
        })
    })
})

router.get('/get_visual_by_id',(req,res)=>{
    var {id,type,callback}=req.query
    VisualModel.findOne({
        id
    },(err,doc)=>{
        if(err){
            res.json(status.QUERY_ERROR)
            return
        }
        console.log("doc",doc)
        doc=doc._doc
        var result=Object.assign({},status.QUERY_SUCCESS,doc)
        if(!callback){
            res.json(result)
        }else{
            res.end(`${callback}(${JSON.stringify(result)})`)
        }
        res.json(result)
    })
})

module.exports = router;
