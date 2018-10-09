<!-- 顶部信息栏 开始-->
<template>
  <div class="container_top" style="padding: 10px;">
    <a class="exit" @click="exit" href="javascript:;" style="position: absolute;
    right: 50px;">退出</a>
  </div>
</template>

<script>
	import login from 'modules/login'

	export default {
		methods:{
			exit(){
				login.logout()
				location.replace('login.html') 	
			}
		}
	}
</script>