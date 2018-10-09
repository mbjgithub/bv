import jsonp from 'modules/jsonp'
import getType from 'modules/get-type'
import qs from 'modules/url'
import ajax from 'modules/ajax'
import fns from 'modules/fns'
function resHandler(url, resolve, reject, res) {
  if (res.ok) {
    res.text()
      .then(function (text) {
        try {
          resolve(JSON.parse(text))
        } catch(e) {
          reject(new Error(`${url} => Invalid json response: ` + text))
        }
      }, reject)
  } else {
    reject(new Error(`${url} => Reqeust fail: ` + res.statusText))
  }
}

// 缺省带cookie
class Fetcher{
  constructor(){
    
  }
  jsonp(url, query) {
    var that=this
    return new Promise((resolve, reject)=>{
      var _reject = reject
      reject = function (err) {
        console.error(err)
        _reject(err)
      }
      jsonp(url, Object.assign(query || {},getType()), function (err, data) {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }
  get(url, query, conf) {
    var that=this
    return new Promise((resolve, reject)=>{
      var _reject = reject
      reject = function (err) {
        console.error(err)
        _reject(err)
      }
      return fetch(qs.queryJoin(url,Object.assign(query||{},getType())), Object.assign({
        method: 'GET',
        credentials: 'include'
      }, conf))
      .then(resHandler.bind(null, url, resolve, reject), reject)
    })
  }

  post(url,body,conf){
    Object.assign(body,getType())
    return new Promise((resolve,reject)=>{
      ajax({
        url,
        data:body,
        type:'POST',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,  
        success(data){
          resolve(fns.type(data)=='string'? JSON.parse(data):data)
        },
        fail(xml,type,err){
          reject(err)
        }
      })
    })
  }
  //fetch的这个post好多鬼，让Express的body-parser解析不出来东西，ajax就不会
  // post(url, body, conf) {
  //   var that=this
  //   return new Promise((resolve, reject)=>{
  //     var _reject = reject
  //     reject = function (err) {
  //       console.error(err)
  //       _reject(err)
  //     }
  //     Object.assign(body,getType())
  //     return fetch(url, Object.assign({
  //       method: 'POST',
  //       mode:'cors',
  //       credentials: 'include',
  //       headers: {
  //         // 'Content-Type': 'application/json; charset=utf-8'
  //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  //       },
  //       body: `data=${JSON.stringify(body)}`
  //     }, conf))
  //     .then(resHandler.bind(null, url, resolve, reject), reject)
  //   })
  // }
}


const api=new Fetcher()
export default api
