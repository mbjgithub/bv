var env=process.env.NODE_ENV
var port=process.env.PORT

module.exports={
	ip: env?"127.0.0.1":"172.16.0.6",
	port:port || 1337,
	outerIp:'193.112.82.136',
	outerPort:1337
}