import {
  MUTATION_INIT,
  INIT_ACTION
} from './consts'

import fetchAllData from './fetchers/'

export default {
  namespaced: true,
  state: {
    payload: {
      cntInfo:''  
    }
  },
  mutations: {
    [MUTATION_INIT](state, data) {
      Object.assign(state.payload, data)
    }
  },
  actions: {
    [INIT_ACTION]({
      commit
    }) {
      fetchAllData(function(err,data) {
        if(err){
          console.log('order ','get data error')
          return 
        }
        console.log("fetchAllData", data)
        commit(MUTATION_INIT, data)
      })
    }
  }
}