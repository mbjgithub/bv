/**
 *路由配置
 */

import VueRouter from 'vue-router'

import Login from 'pages/login'
import Index from 'pages/index'
import Content from 'pages/content'
import Visual from 'pages/visual'
import ContentInput from 'pages/content_input'
import InternationImg from 'pages/internation_img'

var routes = [{
  path: '/', 
  component: Index,
  name:'absIndex'        //命名路由，可用于数据上报
},{
  path: '/index.html', 
  component: Index,
  name:'index'
},{
  path: '/content.html', 
  component: Content,
  name:'content'
},{
  path: '/content_input.html', 
  component: ContentInput,
  name:'content_input'
},{
  path: '/visual.html', 
  component: Visual,
  name:'visual'
},{
  path:'/login.html',
  components:{
    login:Login      //命名视图的路由写法
  },
  name:'login'
},{
  path: '/internation_img.html', 
  component: InternationImg,
  name:'internation_img'
}]

const prefix='/manage'

routes=[...routes,...routes.map(r=>{
  return Object.assign({},r,{path:prefix+r.path,
                          name:prefix+r.path})
})]

const router = window._router = new VueRouter({
  routes,
  mode: 'history'
})

import getType from 'modules/get-type'
import qs from 'modules/url'

router.to=(url)=>{
  var type=getType()
  if(!/type=/.test(url)){
    url=qs.queryJoin(url,type)
  }
  router.push(url)
}

export default router