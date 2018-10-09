
module.exports=(arr,key)=>{
	arr=arr||[]
	return arr.sort((a,b)=>{
		return b[key]-a[key]
	})
}