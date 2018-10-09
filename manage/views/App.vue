<template>
  <div style="height:100%;">
    <div class="wrapper" v-show="isLogin">
      <LeftMenu></LeftMenu>
      <NavigatorHeader></NavigatorHeader>
      <div class="site_container">
        <div class="container_main">
          <router-view></router-view>   
        </div>
      </div>
    </div>
    <div class="wrapper" v-show="!isLogin">
      <router-view name="login"></router-view>
    </div>
    <Toast v-show="isShowToast"
              :title="title"></Toast>
  </div>
</template>

<script>

  import LeftMenu from 'comps/left-menu'
  import NavigatorHeader from 'comps/head'
  import Toast from 'comps/toast'

  import Login from 'modules/login'

  var timer
  var duration=2000
  export default {
    components:{LeftMenu,Toast,NavigatorHeader},
    data(){
      return {
        title:'',
        isShowToast:false,
        isLogin:false
      }
    },
    created(){
      var that=this
      //全局toast
      bus.$on('toast',data=>{
        that.isShowToast=true
        that.title=data.title
        clearTimeout(timer)
        timer=setTimeout(()=>{
          that.isShowToast=false
          data.onCloseCb&&data.onCloseCb()
        },data.duration||duration)
      })
      //如果没有登录的话，跳转到登录页
      if(!Login.isLogin()){
        _router.push('login.html')
        return
      }
      this.isLogin=true
  
    }
  }
</script>
