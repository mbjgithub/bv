<template>
  <div>
    <ModTitle title="视觉列表"></ModTitle>

    <template v-if="visualInfo&&visualInfo.iErrCode==0">
      <ActionRight title="新建视觉"
                    @add="onAdd"></ActionRight>
      <VisualInfo :visualInfo="visualInfo"
                   @edit="onEdit"></VisualInfo>
    </template>

    <template v-else-if="!visualInfo">
      <Loading></Loading>
    </template>

    <template v-else>
      <ErrCode :errMsg="'拉取数据失败-'+(visualInfo.iErrCode||1)"></ErrCode>
    </template>
    <VisualCulturePop v-if="isShowCulturePop"
                    :info="info"
                    :title="addTitle"
                    @close="onClose"
                    @confirm="onAddConfirm"></VisualCulturePop>
  </div>
</template>
<script>

import ActionRight from 'comps/action-right'
import ModTitle from 'comps/mod-title'

import VisualInfo from './comps/visual-info.vue'
import VisualCulturePop from './comps/visual-culture-pop.vue'

import {INIT_ACTION,INIT_COMMIT} from './consts'

import {NAMESPACE} from './modules/config'

import Vuex from 'vuex'
import modifyReq from './fetchers/modify-visual'
import {CULTURE} from 'modules/channel-status'

var update=0
export default {
  components:{ActionRight,VisualInfo,ModTitle,VisualCulturePop},
  data(){
    return { 
      isCulture:false,
      info:'',
      isShowCulturePop:false,
      addTitle:''
    }
  },
  computed:{
    ...Vuex.mapState(NAMESPACE,{
      visualInfo:state=>state.payload.visualInfo
    })
  },
  created () {
    this.$store.dispatch(`${NAMESPACE}/${INIT_ACTION}`)
  },
  methods:{
    onAdd(){
      this.isShowCulturePop=true
      this.addTitle="新建视觉"
      update=0
    },
    onEdit(info,index){
      update=1
      this.isShowCulturePop=true
      this.info=info
      this.addTitle="修改视觉"
      this.index=index
    },
    async onAddConfirm(info){
      var [err,data]=await to(modifyReq(Object.assign({},info,{update})))
      if(err){
        bus.$emit('toast',{title:`${this.addTitle}失败-${err.iErrCode || 1}`})
        return
      }
      this.onClose()
      bus.$emit("toast",{title:`${this.addTitle}成功`})
      var vecVisual=this.visualInfo.vecVisual || []
      if(!update){
        vecVisual.unshift(data)
      }else{
        vecVisual.splice(this.index,1)
        vecVisual.splice(this.index,0,info)
      }
      this.visualInfo.vecVisual=vecVisual
      
    },
    onClose(){
      this.isShowCulturePop=false
      this.info=''
    }
  }
}
</script>