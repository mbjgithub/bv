import Fetcher from 'modules/fetcher'
import channelInfo from './channel-info'

var all={
  channelInfo
}

export default function(callback){
 return new Fetcher(all).fetchData(callback)
}