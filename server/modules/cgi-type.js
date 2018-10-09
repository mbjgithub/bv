var prefix='cgi'
var READ_CGI={
	[`/${prefix}/channel_list`]:true,
	[`/${prefix}/content_list`]:true
}

module.exports=(url)=>{
	url=url.split('?')[0]
	return READ_CGI[url]
}