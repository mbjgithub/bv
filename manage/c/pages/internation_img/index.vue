<template>
  <div>
    <div class="mod_model">
      <ModTitle title="国际首页图片"></ModTitle>

      <template v-if="imgInfo&&imgInfo.iErrCode==0">
        <BaseInfo :imgInfo="imgInfo"></BaseInfo>
      </template>

      <template v-else-if="!imgInfo">
        <Loading></Loading>
      </template>

      <template v-else>
        <ErrCode :errMsg="'拉取数据失败-'+(imgInfo.iErrCode||1)"></ErrCode>
      </template>
    </div>
    <IFooter :imgInfo="imgInfo"></IFooter>
  </div>
</template>
<script>

import ModTitle from 'comps/mod-title'
import ErrCode from 'comps/err-code'
import Loading from 'comps/loading'

import BaseInfo from './comps/base-info.vue'
import IFooter from './comps/footer.vue'

import {INIT_ACTION,INIT_COMMIT} from './consts'

import {NAMESPACE} from './modules/config'

import Vuex from 'vuex'

export default {
  components:{ModTitle,ErrCode ,Loading ,BaseInfo,IFooter},
  data(){
    return { 

    }
  },
  computed:{
    ...Vuex.mapState(NAMESPACE,{
      imgInfo:state=>state.payload.imgInfo
    })
  },
  created () {
    this.$store.dispatch(`${NAMESPACE}/${INIT_ACTION}`)
  }
}
</script>