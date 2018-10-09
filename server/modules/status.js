module.exports={
	ERROR_NOT_LOGIN:{
		iErrCode:1007,
		errMsg:'not login'
	},
	QUERY_ERROR:{
		iErrCode:1008,
		errMsg:'query error'
	},
	UPLOAD_ERROR:{
		iErrCode:1006,
		errMsg:1005
	},	
	QUERY_SUCCESS:{
		iErrCode:0,
		errMsg:''
	},
	DEL_ERROR:{
		iErrCode:1008,
		errMsg:'delete error'
	},
	QUERY_EMPTY:{
		iErrCode:1002,
		errMsg:'not exist'
	},
	INPUT_ERROR:{
		iErrCode:1009,
		errMsg:'input error'
	},
	INTERNATIONAL:1,
	CULTURE:2,
	isCulture:function(type){
		return type==this.CULTURE
	}
}