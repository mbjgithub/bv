import Fetcher from 'modules/fetcher'
import cntInfo from './content-info'

var all={
  cntInfo
}

export default function(callback){
 return new Fetcher(all).fetchData(callback)
}