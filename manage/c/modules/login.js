import cookie from 'modules/cookie'
import cgi from 'modules/interface'
import api from 'modules/api'
/**
 *封装登录态相关操作
 */

var Login = {
  isLogin: function() {
    var vuid=cookie.get('vuid')
    return /_/.test(vuid)
  },
  loginJudge(options){
  	return api.post(cgi.login_judge,options)
  },
  logout(){
  	cookie.remove('vuid','','/')
  },
  keepLogin(username,password){
  	cookie.set('vuid',`${username}_${password}`,172800000)
  }
}

export default Login