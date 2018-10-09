import api from 'modules/api'
import cgi from 'modules/interface'

export default (options={})=>{
  return api.post(cgi.modify_content,options)
}