var express = require("express");
var ChannelModel = require("../models/channel");

var router = express.Router();
var status =require("../modules/status")
var commErrHandler=require('../modules/comm-error-handler')
var sortByKey =require('../modules/sort')
/**
 * [添加内容]
 * @param  {[type]} req  [description]
 * @param  {[type]} res) {               var {strName,type} [description]
 * @return {[type]}      [description]
 */
router.post("/modify_content", function(req, res) {
    var {channelId,content,type,update}=req.body
    content=JSON.parse(content)
    var {_id}=content
    var isAdd=+update ? false : true
    var isCulture=status.isCulture(type)
    var key= isCulture ? 'culture' : 'international'
    var payload=content
    var order=+new Date()
    payload.order=order
    console.log("PAYLOAD",payload,isCulture)
    if(isCulture){
        var {strTitle,strImg,strDesc}=payload
        console.log("333333",strTitle,strImg,strDesc)
        if(!strTitle || !strImg || !strDesc){
            res.json(Object.assign({},status.INPUT_ERROR))
            return
        }
    }else{
        var {
            strTitle,
            strLocationEn,
            strLocationZh,
            strTime,
            strCover,
            vecMixed
        }= payload
        console.log("44444444",strTitle,strLocationEn,strLocationZh,strTime,strCover,vecMixed)
        if(!strTitle || !strLocationEn || !strLocationZh || !strTime
             || !strCover || !vecMixed){
            res.json(Object.assign({},status.INPUT_ERROR))
            return
        }
        if(vecMixed && vecMixed.length){
            vecMixed.forEach(mixed=>{
                mixed.order=+new Date()
            })
        }
    }
    // var $update
    // var data={}
    // data[key]=payload
    // $update={$set:data}
    //新增,其实就是给某个channelID的international或者culture push一个对象
    var fixedData
    ChannelModel.findOne({_id:channelId},(err,doc)=>{
        var vecContent=doc[key]|| []
        if(isAdd){
            vecContent.push(payload)
            console.log("#3333333333333")
        }else{
            vecContent.some(cnt=>{
                if(cnt._id == payload._id){
                    fixedData=Object.assign(cnt,payload)
                    console.log("CNT",cnt)
                    return true
                }
            })
        }

        doc[key]=vecContent
        doc.save((err,doc)=>{
            if(err){
                res.json(status.QUERY_ERROR)
                return
            }
            if(isAdd){
                var vecData=doc[key] || []
                fixedData=vecData[vecData.length-1]
            }
            res.json(Object.assign({},status.QUERY_SUCCESS,fixedData._doc))
        })
    })
    // if(isAdd){
    //     ChannelModel.update({
    //         [key+'._id']:id
    //     }, $update,commErrHandler(req,res))
    // }else{   //修改
    //     delete payload._id
    //     ChannelModel.updateOne({
    //         [key+'._id']:id
    //     }, $update,commErrHandler(req,res))
    // }
});

router.get("/del_content_miaomiao",(req,res)=>{
    var {id,type}=req.query
    var isCulture=status.isCulture(type)
    var key=isCulture ? 'culture' : 'international'
    ChannelModel.findOne({
       [key+'._id']:id
    },(err,doc)=>{
        if(err){
            res.json(status.QUERY_ERROR)
            return
        }
        var vecData=doc[key] || []
        for(var i=0;i<vecData.length;i++){
            if(vecData[i]._id==id){
                vecData.splice(i,1)
                i--
            }
        }
        doc[key]=vecData
        doc.save(commErrHandler(req,res))
    })
})

/**
 * 删除内容
 * @param  {[type]} "/del_content" [description]
 * @param  {[type]} (req,res)      [description]
 * @return {[type]}                [description]
 */
router.post("/del_content",(req,res)=>{
    var {id,type}=req.body
    var isCulture=status.isCulture(type)
    var key=isCulture ? 'culture' : 'international'
    ChannelModel.findOne({
       [key+'._id']:id
    },(err,doc)=>{
        if(err){
            res.json(status.QUERY_ERROR)
            return
        }
        var vecData=doc[key] || []
        vecData.some(data=>{
            if(data._id == id){
                data.isDel=true
                return true
            }
        })
        doc[key]=vecData
        doc.save(commErrHandler(req,res))
    })
})

/**
 * 内容列表
 * @param  {[type]} "/conten_list"           [description]
 * @param  {[type]} (req,res)                 [description]
 * @param  {[type]} null                      [description]
 * @param  {[type]} options.sort:{order:-1} [description]
 * @param  {[type]} (err,docs                 [description]
 * @return {[type]}                           [description]
 */
router.get("/conten_list",(req,res)=>{
    var {id,type,callback}=req.query
    var isCulture=status.isCulture(type)
    var key = isCulture ?'culture':'international'
    // var sort=isCulture ? {culture:{order:-1}} : {international:{order:-1}}
    ChannelModel.findOne({_id:id},null,(err,doc)=>{
        if(err){
            res.json(status.QUERY_ERROR)
            return
        }
        doc=doc._doc
        doc.vecContent=doc[key] || []
        doc.vecContent=doc.vecContent.filter((cnt)=>{
            return !cnt.isDel
        })
        console.log("BEFORE",doc.vecContent)
        doc.vecContent=sortByKey(doc.vecContent,'order') || []
        console.log("AFTER",doc.vecContent)
        delete doc.international
        delete doc.culture
        var result=Object.assign({},status.QUERY_SUCCESS,doc)
        if(!callback){
            res.json(result)
        }else{
            res.end(`${callback}(${JSON.stringify(result)})`)
        }
    })
})

router.get('/get_content_by_id',(req,res)=>{
    var {id,type,callback}=req.query
    var isCulture=status.isCulture(type)
    var key=isCulture? 'culture':'international'
    ChannelModel.findOne({
        [key+"._id"]:id
    },null,(err,doc)=>{
        if(err){
            res.json(status.QUERY_ERROR)
            return
        }
        console.log("doc",doc)
        doc=doc._doc
        vecData=doc[key]
        var data
        vecData.some(d=>{
            if(d._id==id){
                data=d
                return true
            }
        })
        //我不知道这种数组query的方式怎么了，反正必须要有下面这一步要不然会返回很多莫名其妙的东西
        // data=JSON.parse(JSON.stringify(data))
        var result=Object.assign({},status.QUERY_SUCCESS,data._doc)
        if(!callback){
            res.json(result)
        }else{
            res.end(`${callback}(${JSON.stringify(result)})`)
        }
        res.json(result)
    })
})

router.get("/change_content_order",(req,res)=>{
    var {type,contentId1,contentId2}=req.query
    var isCulture=status.isCulture(type)
    var key=isCulture? 'culture':'international'
    ChannelModel.find({
        type,
        isDel:{$ne:true},
        [key+"._id"]:{$in:[contentId1,contentId2]}
    },(err,docs)=>{
        if(err || docs.length<1){
            res.json(status.QUERY_ERROR)
            return
        }
        console.log("DOCS",docs)
        var firstDoc=docs[0]
        vecCnt=firstDoc[key]
        var item1=vecCnt[0]
        var item2=vecCnt[1]
        var order=item2.order
        item2.order=item1.order
        item1.order=order
        firstDoc.save(commErrHandler(req,res))
    })
})

module.exports = router;
