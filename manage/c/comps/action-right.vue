<template>
  <div class="add_action_right">
    <div class="action_right_cont">
      <a href="javascript:void(0);" class="btn_normal_add"
            @click="add">+ {{title}}</a>
      </div>
  </div>
</template>

<script>
  
  export default {
    props:['title'],
    methods:{
      add(){
        this.$emit('add')
      }
    }
  }
</script>