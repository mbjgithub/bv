import api from 'modules/api'
import cgi from 'modules/interface'
import queryInfo from 'modules/query-info'

import getInitState from '../modules/init-state'

export default (options={})=>{
  var query=queryInfo()
  if(!query.id) return Promise.resolve(getInitState())
  return api.get(cgi.get_content_by_id,Object.assign({
  	id:query.id
  },options)).then(data=>{
  	data.strTime=data.strTime ? new Date(+data.strTime) : ''
  	return data
  })
}