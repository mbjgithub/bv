<template>
  <li class="filter_item">
    <label class="filter_label">{{title}}<span class="color_red">*</span></label>
    <div>
      <el-date-picker type="datetime"  
                      align="right"  
                      :placeholder="placeholder || title"  
                      v-model='val'></el-date-picker>
    </div>
  </li>
</template>

<script>
  
  export default {
    // inheritAttrs:false,
    props:['value','title','placeholder','maxlength','isNeeded'],
    data(){
      return {
        val:this.value
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