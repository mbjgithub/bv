<template>
  <li class="filter_item">
    <label class="filter_label">{{title}}
      <span class="color_red" v-if="isNeeded">*</span>
    </label>
    <div class="item_input item_input_img">
      <div class="mod_input_img_box mod_input_img_box_line">
        <div class="input_img_box">
          <i class="icon icon_plus"><svg class="svg_icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_icon_plus"></use></svg></i> 
          <img v-if="val"
               :src="val" 
               class="img">
          <Upload v-model="val"></Upload>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
  
  import Upload from 'comps/upload'
  export default {
    // inheritAttrs:false,
    props:['value','title','maxlength','isNeeded'],
    components:{Upload},
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