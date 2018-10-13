import api from 'modules/api'
import cgi from 'modules/interface'

export default (options={})=>{
  return api.get(cgi.visual_list,options)
}