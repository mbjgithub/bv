import api from 'modules/api'
import cgi from 'modules/interface'
import queryInfo from 'modules/query-info'

export default (options={})=>{
 var query=queryInfo()
  return api.post(cgi.del_content,Object.assign({
  	id:query.id
  },options))
}