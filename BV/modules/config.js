var env=require('./env')

var cgi='http://193.112.82.136:1337'

if(env.isTest){
	cgi="http://127.0.0.1:1337"
}

module.exports={
	cgi:cgi
}