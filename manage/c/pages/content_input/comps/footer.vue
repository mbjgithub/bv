<template>
  <div class="container_bottom">
    <div class="btn_containner">
      <a href="javascript:void(0);" 
         class="btn_normal" 
         @click="save">保存</a> 
    </div>
  </div>
</template>

<script>

  import modifyReq from '../fetchers/modify-content'
  import validate from 'modules/input-validate'
  import copy from 'modules/copy'
  export default {
    props:['cntInfo','addTitle'],
    methods:{
      async save(){
        if(!this.passBeforeSave()) return
        var query=this.$route.query
        var update=!!query.id?1:0
        var channelId=query.channelId
        var content=copy(this.cntInfo)
        content.strTime=content.strTime ? +new Date(content.strTime) : ''
        var [err,data]=await to(modifyReq({
          content:JSON.stringify(content),
          channelId,
          update
        }))
        if(err){
          bus.$emit('toast',{title:`${this.addTitle}失败-${err.iErrCode || 1}`})
          return
        }
        _router.to(`content.html?id=${channelId}`)
      },
      passBeforeSave(){
        var cntInfo=this.cntInfo
        var vecMixed=cntInfo.vecMixed || []
        var vecValidate=[
          [[{isNeeded:true,title:'内容标题不能为空'}],cntInfo.strTitle],
          [[{isNeeded:true,title:'封面图不能为空'}],cntInfo.strCover],
          [[{isNeeded:true,title:'图文内容不能为空'}],cntInfo.vecMixed]
        ]
        if(!vecValidate.every((item)=>{
          return validate(item[0],item[1])
        })) return false
        var txt
        return vecMixed.every((mixed,index)=>{
          if(!mixed.strImg){
            txt=`图片${index+1}不能为空`
          }else if(!mixed.strDesc){
            txt=`图片${index+1}图片配文不能为空`
          }
          if(txt){
            bus.$emit('toast',{title:txt})
            return false
          }
          return true
        })
      }
    }
  }
</script>