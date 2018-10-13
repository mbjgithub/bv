import Fetcher from 'modules/fetcher'
import visualInfo from './visual-info'

var all={
  visualInfo
}

export default function(callback){
 return new Fetcher(all).fetchData(callback)
}