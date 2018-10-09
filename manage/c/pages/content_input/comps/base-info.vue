<template>
  <div class="mod_row">
    <div class="mod_hd">
      <label class="label">基础信息</label>
    </div>
    <div class="mod_hd">
      <ul class="filter_list">
        <BaseInput v-model="cntInfo.strTitle"
                   title="内容标题"
                   class="filter_item_line"></BaseInput>
        <BaseInput v-model="cntInfo.strLocationEn"
                   title="地点(英)"></BaseInput>
        <BaseInput v-model="cntInfo.strLocationZh"
                   title="地点(中)"></BaseInput>
        <BaseDatePicker v-model="cntInfo.strTime"
                        title="时间日期"></BaseDatePicker>
        <BasePicture v-model="cntInfo.strCover"
                     title="封面图"></BasePicture>
      </ul>
    </div>
  </div>
</template>

<script>

  import BaseInput from 'comps/base-input'
  import BaseDatePicker from 'comps/base-date-picker'
  import BasePicture from 'comps/base-picture'

  export default {
    components:{BaseInput,BaseDatePicker,BasePicture},
    props:["cntInfo"]
  }
</script>