var prefix='cgi'
var READ_CGI={
	[`/${prefix}/channel_list`]:true,
	[`/${prefix}/content_list`]:true,
	[`/${prefix}/visual_list`]:true,
	[`/${prefix}/get_internation_img`]:true,
}

module.exports=(url)=>{
	url=url.split('?')[0]
	return READ_CGI[url]
}