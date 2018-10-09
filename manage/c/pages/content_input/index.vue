<template>
  <div>
    <div class="mod_model">
      <ModTitle :title="addTitle"></ModTitle>
      <template v-if="cntInfo&&cntInfo.iErrCode==0">
        <BaseInfo :cntInfo="cntInfo"></BaseInfo>
        <ImgInfo :cntInfo="cntInfo"></ImgInfo>
      </template>
      <template v-else-if="!cntInfo">
        <Loading></Loading>
      </template>
      <template v-else>
        <ErrCode :errMsg="'查询失败-'+(cntInfo.iErrCode||1)"></ErrCode>
      </template>
    </div>
    <IFooter :cntInfo="cntInfo"
             :addTitle="addTitle"></IFooter>
  </div>
</template>

<script>
  
  import ModTitle from 'comps/mod-title'
  import ErrCode from 'comps/err-code'
  import Loading from 'comps/loading'

  import ImgInfo from './comps/img-info.vue'
  import BaseInfo from './comps/base-info.vue'
  import IFooter from './comps/footer.vue'

  import {MUTATION_INIT,INIT_ACTION} from './consts'

  import {NAMESPACE} from './modules/config'
  import Vuex from 'vuex'
  export default {
    components:{ModTitle,Loading,ErrCode,ImgInfo,BaseInfo,IFooter},
    computed:Vuex.mapState(NAMESPACE,{
      cntInfo:state=>state.payload.cntInfo
    }),
    data(){
      return { 
        addTitle:''
      }
    },
    created(){
      var query=this.$route.query
      this.addTitle=!!query.id ? '修改内容' : '新建内容'
      this.$store.dispatch(`${NAMESPACE}/${INIT_ACTION}`)
    }
  }
</script>