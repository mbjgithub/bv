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
          <li class="filter_item">
            <label class="filter_label">频道名称<span class="color_red">*</span></label>
            <div class="item_input">
              <input type="text" placeholder="最多10个字" v-model="local.strName" :maxlength="len">
              <span class="input_tip"><span class="color_red">{{local.strName | chineseLen}}</span>/{{len}}</span>
            </div>
          </li>
          <!-- <li class="filter_item">
            <label class="filter_label">类目介绍</label>
            <div class="item_input item_input_textarea">
              <textarea placeholder="最多30个字" v-model="local.strDesc" maxlength="30"></textarea>
              <span class="input_tip"><span class="color_red">{{local.strDesc | chineseLen}}</span>/30</span>
            </div>
          </li> -->
        </ul>
      </div>
      <div class="pop_ft">
        <a href="javascript:void(0);" class="btn_normal" @click="onConfirm">确认</a>
      </div>  
    </div>
  </div>
</template>

<script>
  import bus from 'modules/bus'
  export default {
    props:['info','title'],
    data(){
      return {
        len:10,
        local:Object.assign({},this.info)
      }
    },
    methods:{
      onClose(){
        this.$emit('close')
      },
      onConfirm(){
        if(!this.local.strName){
          bus.$emit('toast',{title:'名称不能为空'})
          return
        }
        // var txt=''
        // if(!this.local.dfProfitRatio){
        //   txt='费率不能为空'
        // }else if(!/0\.\d+/.test(this.local.dfProfitRatio)){
        //   txt='请输入合法的费率'
        // }
        // if(txt){
        //   bus.$emit('toast',{title:txt})
        //   return
        // }
        this.$emit('confirm',this.local)
      }
    }
  }
</script>