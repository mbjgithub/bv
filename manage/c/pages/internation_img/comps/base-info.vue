<template>
  <div class="mod_row">
    <div class="mod_hd">
      <label class="label">基础信息</label>
    </div>
    <div class="mod_hd">
      <ul class="filter_list">
        <BasePicture 
                     v-model="imgInfo.strImg"
                     :isNeeded="true"
                     :title="'图片'"></BasePicture>
      </ul>
    </div>
  </div>
</template>

<script>

  import BasePicture from 'comps/base-picture'

  export default {
    components:{BasePicture},
    props:["imgInfo"]
  }
</script>