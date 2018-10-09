<template>
  <div class="pop_outer">
    <div class="pop_mask"></div>
    <div class="pop pop_model">
      <a href="javascript:;" class="pop_close" @click="onClose"><i class="icon icon_close"><svg class="svg_icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_icon_close"></use></svg></i></a>
      <div class="pop_hd">
        <div class="pop_label">{{title}}</div>
      </div>
      <div class="pop_bd">
        <ul class="filter_list">
          <BaseInput v-model="local.strTitle"
                     title="内容标题"
                     :isNeeded="true"></BaseInput>

          <BasePicture 
                     v-model="local.strImg"
                     :isNeeded="true"
                     :title="'图片'"></BasePicture>
  
          <BaseInput  class="filter_item_s"
                    v-model="local.strDesc"
                    :type="'textarea'"
                    title="图片简介"
                    :isNeeded="true"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    :maxlength='100'></BaseInput>
        </ul>
      </div>
      <div class="pop_ft">
        <a href="javascript:void(0);" class="btn_normal" @click="onConfirm">确认</a>
      </div>  
    </div>
  </div>
</template>

<script>
  import BaseInput from 'comps/base-input'
  import BasePicture from 'comps/base-picture'

  import validate from 'modules/input-validate'

  export default {
    props:['info','title'],
    components:{BaseInput,BasePicture},
    data(){
      return {
        local:Object.assign({},this.info)
      }
    },
    methods:{
      onClose(){
        this.$emit('close')
      },
      onConfirm(){
        var local=this.local
        var vecValidate=[
          [[{isNeeded:true,title:'内容标题不能为空'}],local.strTitle],
          [[{isNeeded:true,title:'图片不能为空'}],local.strImg],
          [[{isNeeded:true,title:'图片简介不能为空'}],local.strDesc]
        ]
        if(!vecValidate.every((item)=>{
          return validate(item[0],item[1])
        })) return
        this.$emit('confirm',this.local)
      }
    }
  }
</script>