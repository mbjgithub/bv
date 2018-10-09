var express = require("express");
var ChannelModel = require("../models/channel");

var router = express.Router();
var status =require("../modules/status")
var commErrHandler=require('../modules/comm-error-handler')

/**
 * [添加频道]
 * @param  {[type]} req  [description]
 * @param  {[type]} res) {               var {strName,type} [description]
 * @return {[type]}      [description]
 */
router.post("/modify_channel", function(req, res) {
    var {strName,type,update,_id}=req.body
    type=type || status.INTERNATIONAL
    if(!strName){
       res.json(Object.assign({},status.INPUT_ERROR,{errMsg:'strName is needed'}))
       return 
    }
    //新增
    if(!+update){
        var order=+new Date() 
        var channel=new ChannelModel({strName,order,type})
        channel.save(commErrHandler(req,res))
    }else{   //修改
        var $update={strName}
        ChannelModel.updateOne({
            _id
        },$update,commErrHandler(req,res))
    }
});

/**
 * 删除频道
 * @param  {[type]} "/del_channel" [description]
 * @param  {[type]} (req,res)      [description]
 * @return {[type]}                [description]
 */
router.post("/del_channel",(req,res)=>{
    var {id}=req.body
    var $update={isDel:true}
    ChannelModel.update({
        _id:id
    },$update,commErrHandler(req,res))
})

/**
 * 频道列表
 * @param  {[type]} "/channel_list"           [description]
 * @param  {[type]} (req,res)                 [description]
 * @param  {[type]} null                      [description]
 * @param  {[type]} options.sort:{order:-1} [description]
 * @param  {[type]} (err,docs                 [description]
 * @return {[type]}                           [description]
 */
router.get("/channel_list",(req,res)=>{
    var {type,callback}=req.query
    ChannelModel.find({type,isDel:{$ne:true}},null,{sort:{order:-1}},(err,docs)=>{
        if(err){
            res.json(status.QUERY_ERROR)
            return
        }
        docs.forEach(doc=>{
            var vecData=doc.international&& doc.international.length ? doc.international :doc.culture
            for(var i=0;i<vecData.length;i++){
                if(vecData[i].isDel){
                    vecData.splice(i,1)
                    i--
                }
            }
        })
        var result=Object.assign({},status.QUERY_SUCCESS,{
            vecChannel:docs || []
        })
        if(!callback){
            res.json(result)
        }else{
            res.end(`${callback}(${JSON.stringify(result)})`)
        }
    })
})

router.get("/change_channel_order",(req,res)=>{
    var {type,channelId1,channelId2}=req.query

    ChannelModel.find({
        type,
        isDel:{$ne:true},
        _id:{$in:[channelId1,channelId2]}
    },(err,docs)=>{
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

module.exports = router;
