/**
 *使用await/async时，避免try-catch
 */

const RIGHT_ERR_CODE=0

var to=(promise)=>{
  return promise.then(data=>{
    if(data&&data.iErrCode===RIGHT_ERR_CODE){
      return [null,data]
    }
    return [data]
  }).catch(err=>[err])
}

window.to=to

export default to