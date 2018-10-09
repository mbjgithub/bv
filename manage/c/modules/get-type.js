import queryInfo from 'modules/query-info'
import {INTERNATIONAL,CULTURE} from 'modules/channel-status'

export default ()=>{
	var query=queryInfo()
	var type=INTERNATIONAL
	if(!~[INTERNATIONAL,CULTURE].indexOf(+query.type)){
		type=INTERNATIONAL
	}else{
		type=query.type
	}
	return {type:+type}
}