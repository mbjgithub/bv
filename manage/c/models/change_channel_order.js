import cgi from 'modules/interface'
import api from 'modules/api'

export default (options={})=>{
 return api.get(cgi.change_channel_order,options)
}