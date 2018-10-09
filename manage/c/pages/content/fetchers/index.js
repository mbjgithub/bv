import Fetcher from 'modules/fetcher'
import contentInfo from './content-info'

var all={
  contentInfo
}

export default function(callback){
 return new Fetcher(all).fetchData(callback)
}