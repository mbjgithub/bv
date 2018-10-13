<template>
  <div class="menu_box">
    <dl class="menu">
      <dt class="menu_title"><i class="icon_list"></i>首页管理
      </dt>
      <dd class="menu_item">
        <router-link to="index.html">博文维达国际</router-link>
      </dd>
      <dd class="menu_item">
        <router-link to="index.html?type=2">博文维达文化</router-link>
      </dd>
      <dd class="menu_item">
        <router-link to="visual.html">视觉设计</router-link>
      </dd>
    </dl>
  </div>
</template>

<script>
  
  export default {
    
  }
</script>

<style type="text/css">
  
  .menu_item .router-link-active{
    color: #fff;
  }
  .menu_item .router-link-exact-active{
    color: #7caee0;
  }
</style>