import Fetcher from 'modules/fetcher'
import imgInfo from './get_internation_img'

var all={
  imgInfo
}

export default function(callback){
 return new Fetcher(all).fetchData(callback)
}