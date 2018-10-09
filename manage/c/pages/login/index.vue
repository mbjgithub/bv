<template>
  <div class="login_cont">
    <div class="login_center">
      <img class="logo" src="/img/BV-logo-big-red.png">
      <div>
        <div class="line">
          <span class="left">用户名</span>
          <input type="" name="" v-model="username">
        </div>
        <div class="line">
          <span class="left">密&nbsp&nbsp&nbsp码</span>
          <input type="password" name="" v-model="password">
        </div>
        <button class="login_btn" @click="onLogin">登陆</button>
      </div>
    </div>
  </div>
</template>

<script>
  import validate from 'modules/input-validate'
  import login from 'modules/login'
  const DEFAULT_PAGE='/index.html'

  export default {
    data(){
      return {
        username:'',
        password:''
      }
    },
    methods:{
      async onLogin(){
        var username=this.username
        var password=this.password
         if(!validate([{
           isNeeded:true,
           title:'请输入用户名'
         }],username)) return
         if(!validate([{
           isNeeded:true,
           title:'请输入密码'
         }],password)) return
         var [err,data]=await to(login.loginJudge({
          username,password
         }))

         if(err){
           bus.$emit("toast",{title:`用户名或密码错误-${err.iErrCode || 1}`})
           return 
         }
         login.keepLogin(username,password)
         location.href=location.href.replace(/\/[^\/]+$/,DEFAULT_PAGE)
      }
    }
  }
</script>

<style type="text/css">
  .login_cont{
    width: 100%;
  }
  .login_center{
    margin: 0 auto;
    text-align: center;
    padding-top: 100px;
  }
  .logo{
    width: 112px;
    height: 93px;
    margin-left: 32px;
  }
  .line{
    margin-top: 20px;
    height: 60px;
  }
  .left{
    font-size: 18px;
    color: #000;
    margin-right: 10px;
    display: inline-block;
  }
  .line input{
    width:200px;
    height: 40px;
    border-radius: 20px;
    border:2px solid #000;
    padding-left: 10px;
  }
  .login_btn{
    background: #333;
    width: 100px;
    height: 40px;
    color: #fff;
    line-height: 40px;
    border-radius: 10px;
    margin-left: 32px;
  }
</style>