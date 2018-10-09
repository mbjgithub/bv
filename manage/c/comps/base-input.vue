<template>
  <li class="filter_item">
    <label class="filter_label">{{title}}
      <span class="color_red" :class="{color_red_width:!isNeeded}">{{isNeeded?'*':''}}</span>
    </label> 
    <div class="" :style="{width:type==='textarea'?'80%':'auto'}"><!-- offset_left -->
      <el-input v-model="val"
        :placeholder="placeholder||'请选择'"
        :maxlength="maxlength"
        :disabled="disabled"
        :autosize="autosize"
        :type="type">
      </el-input>
    </div>
    <span class="input_tip_el" v-if="maxlength">
      <span class="color_red">{{val.length}}</span>/{{maxlength}}
    </span>
  </li>
</template>

<script>
  
  export default {
    props:['value','title','placeholder','maxlength','disabled','isNeeded','type','autosize'],
    data(){
      return {
        val:this.value || ''
      }
    },
    watch:{
      value(){
        this.val=this.value
      },
      val(){
        this.$emit('input',this.val)
      }
    }
  }
</script>