<template>
  <div class="mod_row">
    <div class="mod_hd"><label class="label">图文内容</label></div>
    <div class="mod_hd">
      <ul class="filter_list">
       <template v-for="(item,index) in cntInfo.vecMixed">
        <BasePicture class="filter_item_s"
                     v-model="item.strImg"
                     :title="'图片'+(index+1)"></BasePicture>
        <BaseInput  class="filter_item_s"
                    v-model="item.strDesc"
                    :type="'textarea'"
                    title="图片配文"
                    :isNeeded="true"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    :maxlength='100'></BaseInput>
        <li class="filter_item filter_item_s">
          <MoveIcon style="margin:60px 0 0 20px"
                    @up="onUp(index)"
                    @down="onDown(index)"
                    @del="onDel(index)"></MoveIcon>
        </li>
       </template>
      </ul>
      <div class="add_new_cont">
        <a href="javascript:void(0);" 
           class="add_config" 
           style="margin: 0px auto;"
           @click="add">+ 点击新增配置</a>
      </div>
    </div>
  </div>
</template>

<script>
  import BasePicture from 'comps/base-picture'
  import BaseInput from 'comps/base-input'
  import MoveIcon from 'comps/move-icon'

  export default {
    components:{BasePicture,BaseInput,MoveIcon},
    props:['cntInfo'],
    methods:{
      onUp(index){
        if(!index) return
        var vecMixed=this.cntInfo.vecMixed 
        var delt=vecMixed.splice(index,1)
        vecMixed.splice(index-1,0,delt[0])
      },
      onDown(index){
        var vecMixed=this.cntInfo.vecMixed
        if(index >=vecMixed.length-1) return
        var delt=vecMixed.splice(index,1)
        vecMixed.splice(index+1,0,delt[0])
      },
      onDel(index){
        var vecMixed=this.cntInfo.vecMixed
        if(vecMixed.length <= 1){
          bus.$emit('toast',{title:'至少要有一条'})
          return
        }
        vecMixed.splice(index,1)
      },
      add(){
        this.cntInfo.vecMixed.push({
          strDesc : '',
          strImg : ''
        })  
      }
    }
  }
</script>

<style type="text/css">
  .add_new_cont{
    text-align: center;
  }
  .add_config{
    margin: 0 auto;
    font-size: 16px;
  }
</style>