var status=require('./status')

module.exports=(req,res)=>{
	return (err,data)=>{
		if(err){
			console.log("ERROR",err)
			res.json(status.QUERY_ERROR)
			return
		}
		res.json(Object.assign({},status.QUERY_SUCCESS,data._doc||{}))
	}
}