<template>
  <div>
    <ModTitle :title="title"></ModTitle>

    <template v-if="channelInfo&&channelInfo.iErrCode==0">
      <ActionRight title="新建频道"
                   @add="onAdd"></ActionRight>
      <ChannelInfo :channelInfo="channelInfo"
                   @edit="onEdit"></ChannelInfo>
    </template>

    <template v-else-if="!channelInfo">
      <Loading></Loading>
    </template>

    <template v-else>
      <ErrCode :errMsg="'拉取数据失败-'+(channelInfo.iErrCode||1)"></ErrCode>
    </template>
  
    <ChannelNamePop v-if="isShow"
                    :info="info"
                    :title="addTitle"
                    @close="onClose"
                    @confirm="onAddConfirm"></ChannelNamePop>  

  </div>
</template>
<script>

import ActionRight from 'comps/action-right'
import ChannelInfo from './comps/channel-info.vue'
import ModTitle from 'comps/mod-title'

import ChannelNamePop from './comps/channel-name-pop.vue'

import {INIT_ACTION,INIT_COMMIT} from './consts'

import {NAMESPACE} from './modules/config'
import modifyReq from './fetchers/modify-channel'
import {CULTURE} from 'modules/channel-status'

import Vuex from 'vuex'

var update=0
export default {
  components:{ActionRight,ChannelInfo,ModTitle,ChannelNamePop},
  data(){
    return { 
      title:'',
      addTitle:'',
      isShow:false,
      info:'',
      index:''
    }
  },
  computed:{
    ...Vuex.mapState(NAMESPACE,{
      channelInfo:state=>state.payload.channelInfo
    })
  },
  created () {
    this.init()
  },
  watch:{
    $route(to,from){
      this.init()
    }
  },
  methods:{
    init(){
      var query=this.$route.query
      this.title= query.type==CULTURE ? '博文伟达文化' : '博文伟达国际'
      this.$store.dispatch(`${NAMESPACE}/${INIT_ACTION}`)
    },
    onAdd(){
      this.isShow=true
      this.addTitle="新建频道"
      update=0
    },
    onEdit(channelInfo,index){
      this.info=channelInfo
      this.index=index
      this.isShow=true
      this.addTitle="修改频道"
      update=1
    },
    async onAddConfirm(info){
      this.isShow=false
      var [err,data]=await to(modifyReq(Object.assign(info,{update})))
      if(err){
        bus.$emit("toast",{title:`${this.addTitle}失败-${err.iErrCode || 1}`})
        return
      }
      bus.$emit("toast",{title:`${this.addTitle}成功`})
      var vecChannel=this.channelInfo.vecChannel || []
      if(update===1){
        var delt=vecChannel.splice(this.index,1)
        vecChannel.splice(this.index,0,info)
      }else{
        vecChannel.unshift(data)
      }
      this.channelInfo.vecChannel=vecChannel
    },
    onClose(){
      this.isShow=false
      this.info=''
    }
  }
}
</script>