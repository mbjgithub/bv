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

  import modifyReq from '../fetchers/modify_internation_img'
  import copy from 'modules/copy'
  import validate from 'modules/input-validate'
  export default {
    props:['imgInfo'],
    methods:{
      async save(){
        if(!this.passBeforeSave()) return
        var imgInfo=copy(this.imgInfo)
        var [err,data]=await to(modifyReq(imgInfo))
        if(err){
          bus.$emit('toast',{title:`修改失败-${err.iErrCode || 1}`})
          return
        }
        bus.$emit('toast',{title:'修改成功'})
      },
      passBeforeSave(){
        var imgInfo=this.imgInfo
        var vecValidate=[
          [[{isNeeded:true,title:'图片不能为空'}],imgInfo.strImg]
        ]
        if(!vecValidate.every((item)=>{
          return validate(item[0],item[1])
        })) return false
        return true
      }
    }
  }
</script>