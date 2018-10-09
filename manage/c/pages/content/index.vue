<template>
  <div>
    <ModTitle title="内容列表"></ModTitle>

    <template v-if="contentInfo&&contentInfo.iErrCode==0">
      <ActionRight title="新建内容"
                    @add="onAdd"></ActionRight>
      <ContentInfo :contentInfo="contentInfo"
                   @edit="onEdit"></ContentInfo>
    </template>

    <template v-else-if="!contentInfo">
      <Loading></Loading>
    </template>

    <template v-else>
      <ErrCode :errMsg="'拉取数据失败-'+(contentInfo.iErrCode||1)"></ErrCode>
    </template>
    <ContentCulturePop v-if="isShowCulturePop"
                    :info="info"
                    :title="addTitle"
                    @close="onClose"
                    @confirm="onAddConfirm"></ContentCulturePop>
  </div>
</template>
<script>

import ActionRight from 'comps/action-right'
import ModTitle from 'comps/mod-title'

import ContentInfo from './comps/content-info.vue'
import ContentCulturePop from './comps/content-culture-pop.vue'

import {INIT_ACTION,INIT_COMMIT} from './consts'

import {NAMESPACE} from './modules/config'

import Vuex from 'vuex'
import modifyReq from './fetchers/modify-content'
import {CULTURE} from 'modules/channel-status'

var update=0
export default {
  components:{ActionRight,ContentInfo,ModTitle,ContentCulturePop},
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
      contentInfo:state=>state.payload.contentInfo
    })
  },
  created () {
    var query=this.$route.query
    this.channelId=query.id
    this.isCulture = query.type == CULTURE ? true : false
    this.$store.dispatch(`${NAMESPACE}/${INIT_ACTION}`)
  },
  methods:{
    onAdd(){
      if(this.isCulture){
        this.isShowCulturePop=true
        this.addTitle="新建内容"
      }else{
        _router.to(`content_input.html?channelId=${this.channelId}`)
      }
      update=0
    },
    onEdit(info,index){
      update=1
      if(this.isCulture){
        this.isShowCulturePop=true
        this.info=info
        this.addTitle="修改内容"
        this.index=index
      }else{
        _router.to(`content_input.html?id=${info._id}&channelId=${this.channelId}`)
      }
    },
    async onAddConfirm(info){
      var [err,data]=await to(modifyReq(Object.assign({
        content:JSON.stringify(info),
        channelId:this.channelId
      },{update})))
      if(err){
        bus.$emit('toast',{title:`{this.addTitle}失败-${err.iErrCode || 1}`})
        return
      }
      this.onClose()

      var vecContent=this.contentInfo.vecContent || []
      if(!update){
        vecContent.unshift(data)
      }else{
        vecContent.splice(this.index,1)
        vecContent.splice(this.index,0,data)
      }
      this.contentInfo.vecContent=vecContent
      
    },
    onClose(){
      this.isShowCulturePop=false
      this.info=''
    }
  }
}
</script>