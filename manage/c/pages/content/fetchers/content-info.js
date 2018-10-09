import api from 'modules/api'
import cgi from 'modules/interface'
import queryInfo from 'modules/query-info'

export default (options={})=>{
  var query=queryInfo()
  if(!query.id) return Promise.resolve({iErrCode:0})
  return api.get(cgi.conten_list,Object.assign({id:query.id},options))
}